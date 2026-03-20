// Bracket data types

export interface TeamEntry {
  winner: string;
  seed: number;
  bet?: 'won' | 'lost';
}

export interface FirstFourGame {
  team_a: string;
  team_b: string;
  seed: number;
  winner: string;
  probability: number;
  bet?: 'won' | 'lost';
}

export interface RegionData {
  round_of_64: TeamEntry[];
  round_of_32: TeamEntry[];
  sweet_16: TeamEntry[];
  elite_8: TeamEntry;
}

export interface FinalFour {
  semifinals: TeamEntry[];
}

export interface Predictions {
  first_four: FirstFourGame[];
  east: RegionData;
  south: RegionData;
  west: RegionData;
  midwest: RegionData;
  final_four: FinalFour;
  championship: TeamEntry;
}

export interface AlternateInfo {
  alt_index: number;
  alt_type: string;
  round: string;
  region: string;
  game_key: (string | number)[];
  original_winner: string;
  original_winner_seed: number;
  alternate_winner: string;
  alternate_winner_seed: number;
  original_prob: number;
}

export interface BracketData {
  tournament: string;
  season: number;
  predictions: Predictions;
  bracket_type: string;
  alternate_info?: AlternateInfo;
}

export type RegionKey = 'east' | 'south' | 'west' | 'midwest';

export interface RegionConfig {
  key: RegionKey;
  label: string;
  color: string;
  rgb: string;
}
