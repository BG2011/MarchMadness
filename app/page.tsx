'use client';

import { useState, useEffect } from 'react';
import type { BracketData, RegionKey, RegionConfig } from './types';
import BracketView from './components/BracketView';

const BRACKET_FILES = [
  { label: 'Primary', file: '/predicted_bracket_2026.json' },
  { label: 'Alt 1', file: '/predicted_bracket_2026_alt_1.json' },
  { label: 'Alt 2', file: '/predicted_bracket_2026_alt_2.json' },
  { label: 'Alt 3', file: '/predicted_bracket_2026_alt_3.json' },
  { label: 'Alt 4', file: '/predicted_bracket_2026_alt_4.json' },
];

export const REGION_CONFIGS: RegionConfig[] = [
  { key: 'east', label: 'East', color: '#3b82f6', rgb: '59, 130, 246' },
  { key: 'south', label: 'South', color: '#f97316', rgb: '249, 115, 22' },
  { key: 'west', label: 'West', color: '#10b981', rgb: '16, 185, 129' },
  { key: 'midwest', label: 'Midwest', color: '#8b5cf6', rgb: '139, 92, 246' },
];

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [brackets, setBrackets] = useState<(BracketData | null)[]>(Array(5).fill(null));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      const results = await Promise.all(
        BRACKET_FILES.map(async (b) => {
          try {
            const res = await fetch(b.file);
            if (!res.ok) return null;
            return (await res.json()) as BracketData;
          } catch {
            return null;
          }
        })
      );
      setBrackets(results);
      setLoading(false);
    }
    loadAll();
  }, []);

  const activeBracket = brackets[activeIndex];

  return (
    <>
      <div className="bg-grid" />
      <div className="main-wrapper">
        {/* Header */}
        <header className="site-header">
          <div className="header-inner">
            <a href="/" className="header-brand">
              <div className="header-logo">🏀</div>
              <div>
                <div className="header-title">March Madness 2026</div>
                <div className="header-season">NCAA Tournament Predictions</div>
              </div>
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {BRACKET_FILES.map((b, i) => (
                <button
                  key={i}
                  className={`bracket-tab${activeIndex === i ? ' active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                  title={b.label}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="page-container">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner" />
              <p className="loading-text">Loading bracket predictions…</p>
            </div>
          ) : activeBracket ? (
            <BracketView bracket={activeBracket} regionConfigs={REGION_CONFIGS} />
          ) : (
            <div className="loading-container">
              <p className="loading-text">Failed to load bracket data.</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
