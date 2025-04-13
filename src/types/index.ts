// Hero related types
export interface Hero {
  id: string;
  name: string;
  roles: string[];
  imageUrl?: string;
}

export interface HeroMetaData {
  name: string;
  tier: string;
  winRate: number;
  pickRate: number;
  banRate: number;
}

export interface PlayerHero {
  heroId: string;
  gamesPlayed: number;
  winRate: number;
}

// Player related types
export interface Player {
  id: string;
  name: string;
  position: number; // 1-5 for positions
  accountId?: string;
  dotabuffUrl?: string;
  mostPlayed: PlayerHero[];
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
}

// Draft related types
export type TeamSide = "radiant" | "dire";
export type DraftActionType = "ban" | "pick";

export interface DraftAction {
  type: DraftActionType;
  team: TeamSide;
}

export interface DraftState {
  currentStep: number;
  radiantBans: (string | null)[];
  direBans: (string | null)[];
  radiantPicks: (string | null)[];
  direPicks: (string | null)[];
  playerTeam: TeamSide;
}
