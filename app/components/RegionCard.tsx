import type { RegionConfig, RegionData, TeamEntry } from '../types';

interface RegionCardProps {
  region: RegionConfig;
  data: RegionData;
}

// Build pairs of teams for display in round_of_64
// Teams are matched as games: [0v1, 2v3, 4v5, 6v7]
function buildMatchups(teams: TeamEntry[]): [TeamEntry, TeamEntry][] {
  const matchups: [TeamEntry, TeamEntry][] = [];
  for (let i = 0; i < teams.length - 1; i += 2) {
    matchups.push([teams[i], teams[i + 1]]);
  }
  return matchups;
}

interface MatchCardProps {
  teamA: TeamEntry;
  teamB: TeamEntry;
  winner?: string;
  winnerBet?: 'won' | 'lost';
  regionColor: string;
}

function MatchCard({ teamA, teamB, winner, winnerBet, regionColor }: MatchCardProps) {
  const aWins = winner === teamA.winner;
  const bWins = winner === teamB.winner;
  return (
    <div className="match-card" style={{ '--region-color': regionColor } as React.CSSProperties}>
      <div className={`match-team${aWins ? ' winner' : ''}`}>
        <div className="match-team-seed">{teamA.seed}</div>
        <span>{teamA.winner}</span>
        {aWins && winnerBet === 'won' && <span className="bet-status won">✓</span>}
        {aWins && winnerBet === 'lost' && <span className="bet-status lost">✗</span>}
      </div>
      <div className="match-divider" />
      <div className={`match-team${bWins ? ' winner' : ''}`}>
        <div className="match-team-seed">{teamB.seed}</div>
        <span>{teamB.winner}</span>
        {bWins && winnerBet === 'won' && <span className="bet-status won">✓</span>}
        {bWins && winnerBet === 'lost' && <span className="bet-status lost">✗</span>}
      </div>
    </div>
  );
}

interface SingleWinnerProps {
  team: TeamEntry;
  regionColor: string;
  label?: string;
}

function SingleWinner({ team, regionColor, label }: SingleWinnerProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', alignItems: 'stretch' }}>
      {label && (
        <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', textAlign: 'center' }}>
          {label}
        </span>
      )}
      <div
        className="single-winner-card"
        style={{ '--region-color': regionColor } as React.CSSProperties}
      >
        <div className="single-winner-seed">{team.seed}</div>
        <div className="single-winner-name">{team.winner}</div>
        {team.bet === 'won' && <span className="bet-status won" style={{ marginLeft: 'auto' }}>✓</span>}
        {team.bet === 'lost' && <span className="bet-status lost" style={{ marginLeft: 'auto' }}>✗</span>}
      </div>
    </div>
  );
}

export default function RegionCard({ region, data }: RegionCardProps) {
  const { color, rgb, label } = region;
  const r64Matchups = buildMatchups(data.round_of_64);
  const r32Matchups = buildMatchups(data.round_of_32);

  // For Round of 64, find which team from each matchup moved on (appears in round_of_32)
  const r32Winners = new Set(data.round_of_32.map((t) => t.winner));
  const s16Winners = new Set(data.sweet_16.map((t) => t.winner));

  return (
    <div
      className="region-card"
      style={{ '--region-color': color, '--region-rgb': rgb } as React.CSSProperties}
    >
      <div
        className="region-header"
        style={{ '--header-rgb': rgb } as React.CSSProperties}
      >
        <div className="region-title">{label} Region</div>
        <div className="region-finalist">
          <span>→ Elite 8:</span>
          <span className="finalist-name">{data.elite_8.winner}</span>
          <span className="region-finalist-seed">#{data.elite_8.seed}</span>
        </div>
      </div>

      <div className="region-body">
        <div className="rounds-container">
          {/* Round of 64 Winners */}
          <div className="round-col">
            <div className="round-label">Round of 64</div>
            <div className="round-matches">
              {data.round_of_64.map((team, i) => (
                <SingleWinner
                  key={i}
                  team={team}
                  regionColor={color}
                />
              ))}
            </div>
          </div>

          {/* Round of 32 */}
          <div className="round-col">
            <div className="round-label">Round of 32</div>
            <div className="round-matches">
              {r64Matchups.map(([a, b], i) => {
                const winnerName = r32Winners.has(a.winner) ? a.winner : r32Winners.has(b.winner) ? b.winner : undefined;
                const winnerEntry = data.round_of_32.find(t => t.winner === winnerName);
                return (
                  <MatchCard
                    key={i}
                    teamA={a}
                    teamB={b}
                    winner={winnerName}
                    winnerBet={winnerEntry?.bet}
                    regionColor={color}
                  />
                );
              })}
            </div>
          </div>

          {/* Sweet 16 */}
          <div className="round-col">
            <div className="round-label">Sweet 16</div>
            <div className="round-matches">
              {r32Matchups.map(([a, b], i) => {
                const winnerName = s16Winners.has(a.winner) ? a.winner : s16Winners.has(b.winner) ? b.winner : undefined;
                const winnerEntry = data.sweet_16.find(t => t.winner === winnerName);
                return (
                  <MatchCard
                    key={i}
                    teamA={a}
                    teamB={b}
                    winner={winnerName}
                    winnerBet={winnerEntry?.bet}
                    regionColor={color}
                  />
                );
              })}
            </div>
          </div>

          {/* Elite 8 */}
          <div className="round-col">
            <div className="round-label">Elite 8</div>
            <div className="round-matches">
              {(() => {
                const [a, b] = data.sweet_16;
                return (
                  <MatchCard
                    teamA={a}
                    teamB={b}
                    winner={data.elite_8.winner}
                    winnerBet={data.elite_8.bet}
                    regionColor={color}
                  />
                );
              })()}
            </div>
          </div>

          {/* Regional Champion */}
          <div className="round-col">
            <div className="round-label">Winner</div>
            <div className="round-matches">
              <SingleWinner
                team={data.elite_8}
                regionColor={color}
                label="Regional Champion"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
