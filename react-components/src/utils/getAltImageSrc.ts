import { PokemonInfo } from 'types/api/responseTypes';

const getAltImageSrc = (info: PokemonInfo) => {
  return info.sprites.other.home.front_default
    ? info.sprites.other.home.front_default
    : (info.sprites.front_default as string);
};

export default getAltImageSrc;
