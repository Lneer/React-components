export type NamedAPIResource = {
  name: string;
  url: string;
};

export type NamedAPIResourceList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
};

export type Abilities = {
  ability: NamedAPIResource[];
  is_hiden: boolean;
  slot: number;
};

type GameIndex = {
  game_index: number;
  version: NamedAPIResource;
};

type VersionGroupDetail = {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
};

type Moves = {
  move: NamedAPIResource;
  version_group_details: VersionGroupDetail[];
};

type OtherPokemontype = {
  front_default: string | null;
  front_female: string | null;
};
type OtherSprites = {
  dream_world: OtherPokemontype;
  home: OtherPokemontype;
  [key: string]: OtherPokemontype;
};

type Sprites = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: OtherSprites;
  versions: unknown;
};

type Stats = {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
};

export type FullType = {
  slot: number;
  type: NamedAPIResource;
};

export type SearchType = {
  slot: number;
  pokemon: NamedAPIResource;
};
export type TypeResponse = {
  [key: string]: any;
  pokemon: SearchType[];
};
export type PokemonInfo = {
  abilities: Abilities;
  base_experience: number;
  forms: NamedAPIResource[];
  game_indices: GameIndex[];
  height: number;
  id: number;
  held_items: Array<unknown>;
  is_default: boolean;
  location_area_encounters: string;
  moves: Moves;
  name: string;
  order: string;
  species: NamedAPIResource;
  sprites: Sprites;
  stats: Stats[];
  types: FullType[];
  weight: number;
};
