import { PokemonInfo } from 'types/api/responseTypes';

const getImageSrc = (info: PokemonInfo) => {
  let src = info.sprites.other.dream_world.front_default
    ? info.sprites.other.dream_world.front_default
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${info.id}.svg`;

  if (!src) {
    src = info.sprites.other.home.front_default as string;
  }

  return src;
};

export default getImageSrc;
