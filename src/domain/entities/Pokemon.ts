export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  avatar: string;
  sprites: string[];

  color: string;

  games: string[];
  stats: Stat[];
  abilities: string[];
  moves: Move[];
}

interface Stat {
  name: string;
  value: number;
}

interface Move {
  name: string;
  level: number;
}
