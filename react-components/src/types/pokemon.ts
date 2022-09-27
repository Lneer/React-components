export default interface Pokemon {
  id: number;
  name: string;
  img: string;
  order: number;
  height: number;
  weight: number;
  base_experience: number;
  stats: Stats;
  types: Type[];
  is_default: boolean;
}

type Stats = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

type Type =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy';

// export const TypeIcons = {
// 	normal: icons.normalIcon,
// 	fighting: icons.fightingIcon,
// 	flying: icons.flyingIcon,
// 	poison: icons.poisonIcon,
// 	ground: icons.groungIcon,
// 	rock: icons.rockIcon,
// 	bug: icons.bugIcon,
// 	ghost: icons.ghostIcon,
// 	steel: icons.steelIcon,
// 	fire: icons.fireIcon,
// 	water: icons.waterIcon,
// 	grass: icons.grassIcon,
// 	electric: icons.electricIcon,
// 	psychic: icons.psychicIcon,
// 	ice: icons.iceIcon,
// 	dragon: icons.dragonIcon,
// 	dark: icons.darkIcon,
// 	fairy: icons.fairyIcon
// }
