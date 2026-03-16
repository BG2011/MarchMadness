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
          {semifinalTeams.map((team, i) => (
            <div className="ff-team-chip" key={i}>
              <span className="seed-badge">#{team.seed}</span>
              {team.winner}
            </div>
          ))}
          {/* Add Elite Eight losers as Final Four teams that didn't make semis */}
          {['south', 'midwest']
            .filter((region) => {
              const eliteTeam = eliteEight[region as keyof typeof eliteEight];
              return !semifinalTeams.some((t) => t.winner === eliteTeam.winner);
            })
            .map((region) => {
              const t = eliteEight[region as keyof typeof eliteEight];
              return (
                <div className="ff-team-chip" key={region} style={{ opacity: 0.6 }}>
                  <span className="seed-badge">#{t.seed}</span>
                  {t.winner}
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
