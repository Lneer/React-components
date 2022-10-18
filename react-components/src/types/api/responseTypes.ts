type NamedAPIResource = {
  name: string;
  url: string;
};

export type NamedAPIResourceList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
};

type Ability = {
  name: string;
  url: string;
};

export type Abilities = {
  ability: Ability[];
  is_hiden: boolean;
  slot: number;
};

type Form = {
  name: string;
  url: string;
};
type Version = {
  name: string;
  url: string;
};

type GameIndex = {
  game_index: number;
  version: Version;
};

type Move = {
  name: string;
  url: string;
};

type VersionGroup = {
  name: string;
  url: string;
};

type MoveLarnMethod = {
  name: string;
  url: string;
};

type VersionGroupDetail = {
  level_learned_at: number;
  move_learn_method: MoveLarnMethod;
  version_group: VersionGroup;
};

type Moves = {
  move: Move;
  version_group_details: VersionGroupDetail[];
};

type Species = {
  name: string;
  url: string;
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

type Stat = {
  name: string;
  url: string;
};

type Stats = {
  base_stat: number;
  effort: number;
  stat: Stat;
};

type Type = {
  name: string;
  url: string;
};

type FullType = {
  slot: number;
  type: Type;
};

export type PokemonInfo = {
  abilities: Abilities;
  base_experience: number;
  forms: Form[];
  game_indices: GameIndex[];
  height: number;
  id: number;
  held_items: Array<unknown>;
  is_default: boolean;
  location_area_encounters: string;
  moves: Moves;
  name: string;
  order: string;
  species: Species;
  sprites: Sprites;
  stats: Stats[];
  type: FullType[];
  weight: number;
};
