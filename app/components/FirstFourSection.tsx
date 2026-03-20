import type { FirstFourGame } from '../types';

interface FirstFourSectionProps {
  games: FirstFourGame[];
}

export default function FirstFourSection({ games }: FirstFourSectionProps) {
  return (
    <div className="first-four-grid">
      {games.map((game, i) => (
        <div className="first-four-card" key={i}>
          <div className="ff-round-label">Seed {game.seed} Play-In</div>
          <div className="ff-matchup">
            <div className={`ff-team-row${game.winner === game.team_a ? ' is-winner' : ''}`}>
              <div className={`ff-seed${game.winner === game.team_a ? ' is-winner' : ''}`}>
                {game.seed}
              </div>
              {game.team_a}
              {game.winner === game.team_a && game.bet === 'won' && (
                <span className="bet-status won">✓</span>
              )}
              {game.winner === game.team_a && game.bet === 'lost' && (
                <span className="bet-status lost">✗</span>
              )}
            </div>
            <div className="ff-vs">vs</div>
            <div className={`ff-team-row${game.winner === game.team_b ? ' is-winner' : ''}`}>
              <div className={`ff-seed${game.winner === game.team_b ? ' is-winner' : ''}`}>
                {game.seed}
              </div>
              {game.team_b}
              {game.winner === game.team_b && game.bet === 'won' && (
                <span className="bet-status won">✓</span>
              )}
              {game.winner === game.team_b && game.bet === 'lost' && (
                <span className="bet-status lost">✗</span>
              )}
            </div>
          </div>
          <div className="ff-prob">
            Win probability: <span>{(game.probability * 100).toFixed(1)}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
