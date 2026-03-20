import type { BracketData, RegionConfig } from '../types';
import RegionCard from './RegionCard'
import ChampionCard from './ChampionCard';
import FirstFourSection from './FirstFourSection';

interface BracketViewProps {
  bracket: BracketData;
  regionConfigs: RegionConfig[];
}

export default function BracketView({ bracket, regionConfigs }: BracketViewProps) {
  const { predictions, bracket_type, alternate_info } = bracket;

  // Calculate summary stats
  const allBets: ('won' | 'lost')[] = [];
  
  // First Four
  predictions.first_four.forEach(g => g.bet && allBets.push(g.bet));
  
  // Regions
  regionConfigs.forEach(rc => {
    const rd = predictions[rc.key];
    rd.round_of_64.forEach(t => t.bet && allBets.push(t.bet));
    rd.round_of_32.forEach(t => t.bet && allBets.push(t.bet));
    rd.sweet_16.forEach(t => t.bet && allBets.push(t.bet));
    if (rd.elite_8.bet) allBets.push(rd.elite_8.bet);
  });

  // Final Four & Championship
  predictions.final_four.semifinals.forEach(t => t.bet && allBets.push(t.bet));
  if (predictions.championship.bet) allBets.push(predictions.championship.bet);

  const correct = allBets.filter(b => b === 'won').length;
  const wrong = allBets.filter(b => b === 'lost').length;
  const total = allBets.length;

  return (
    <>
      {/* Bracket Summary */}
      <div className="bracket-summary">
        <div className="summary-stat correct">
          <span>Correct:</span>
          <b>{correct}</b>
        </div>
        <div className="summary-stat wrong">
          <span>Wrong:</span>
          <b>{wrong}</b>
        </div>
        <div className="summary-stat total">
          <span>Total Matches:</span>
          <b>{total}</b>
        </div>
        {total > 0 && (
          <div className="summary-stat">
            <span>Accuracy:</span>
            <b>{((correct / total) * 100).toFixed(1)}%</b>
          </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="bracket-info-banner">
        <span className={`badge ${bracket_type === 'Primary' ? 'badge-primary' : 'badge-alt'}`}>
          {bracket_type}
        </span>
        <span className="bracket-info-text">
          <strong>{bracket.tournament}</strong> &mdash; Season {bracket.season}
        </span>
        {alternate_info && (
          <div className="alt-diff-pill">
            <span>⚡</span>
            <span>
              Coinflip: <strong>{alternate_info.original_winner}</strong> →{' '}
              <strong>{alternate_info.alternate_winner}</strong> in {alternate_info.region.toUpperCase()} {alternate_info.round}
            </span>
          </div>
        )}
      </div>

      {/* Champion */}
      <div className="champion-section">
        <ChampionCard
          champion={predictions.championship}
          finalFour={predictions.final_four}
          eliteEight={{
            east: predictions.east.elite_8,
            south: predictions.south.elite_8,
            west: predictions.west.elite_8,
            midwest: predictions.midwest.elite_8,
          }}
        />
      </div>

      {/* First Four */}
      <div className="first-four-section">
        <h2 className="section-heading">First Four</h2>
        <FirstFourSection games={predictions.first_four} />
      </div>

      {/* Regions */}
      <h2 className="section-heading" style={{ marginBottom: '1.25rem' }}>Regional Brackets</h2>
      <div className="regions-grid">
        {regionConfigs.map((region) => (
          <RegionCard
            key={region.key}
            region={region}
            data={predictions[region.key]}
          />
        ))}
      </div>
    </>
  );
}
