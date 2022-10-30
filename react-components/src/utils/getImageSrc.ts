import { PokemonInfo } from 'types/api/responseTypes';

const getImageSrc = (info: PokemonInfo) => {
  return info.sprites.other.dream_world.front_default
    ? info.sprites.other.dream_world.front_default
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${info.id}.svg`;
};

export default getImageSrc;
