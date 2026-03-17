import type { TeamEntry, FinalFour } from '../types';

interface ChampionCardProps {
  champion: TeamEntry;
  finalFour: FinalFour;
  eliteEight: {
    east: TeamEntry;
    south: TeamEntry;
    west: TeamEntry;
    midwest: TeamEntry;
  };
}

const REGION_COLORS: Record<string, string> = {
  east: '#3b82f6',
  south: '#f97316',
  west: '#10b981',
  midwest: '#8b5cf6',
};

export default function ChampionCard({ champion, finalFour, eliteEight }: ChampionCardProps) {
  const semifinalTeams = finalFour.semifinals;

  // Final Four is always the winners of the 4 Elite Eight games
  const finalFourTeams = Object.entries(eliteEight).map(([region, team]) => ({
    ...(team as TeamEntry),
    region
  }));

  return (
    <div className="champion-card">
      <div className="champion-trophy">🏆</div>
      <div>
        <div className="champion-label">Predicted Champion</div>
        <div className="champion-name">{champion.winner}</div>
        <div className="champion-seed">
          Seed <span>#{champion.seed}</span>
        </div>
      </div>

      <div className="final-four-path">
        <div className="ff-label">Final Four</div>
        <div className="ff-teams">
          {finalFourTeams.map((team, i) => {
            const isFinalist = semifinalTeams.some(t => t.winner === team.winner);
            return (
              <div 
                className="ff-team-chip" 
                key={i}
                style={{ 
                  opacity: isFinalist ? 1 : 0.6,
                  borderColor: isFinalist ? REGION_COLORS[team.region] : 'var(--border)'
                }}
              >
                <span className="seed-badge">#{team.seed}</span>
                {team.winner}
                {isFinalist && <span style={{ fontSize: '0.6rem', color: 'var(--accent-gold)' }}>★</span>}
              </div>
            );
          })}
        </div>
        <div className="ff-label" style={{ marginTop: '0.75rem' }}>Elite Eight</div>
        <div className="ff-teams" style={{ flexWrap: 'wrap' }}>
          {Object.entries(eliteEight).map(([region, team]) => (
            <div
              className="ff-team-chip"
              key={region}
              style={{ borderColor: REGION_COLORS[region] + '55', color: REGION_COLORS[region] }}
            >
              <span className="seed-badge" style={{ color: 'var(--text-muted)' }}>#{team.seed}</span>
              {team.winner}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
