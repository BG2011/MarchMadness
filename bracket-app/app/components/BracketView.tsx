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

  return (
    <>
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
