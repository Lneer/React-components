import { NamedAPIResource, NamedAPIResourceList, TypeResponse } from 'types/api/responseTypes';

const responseAdapter = (response: NamedAPIResourceList | TypeResponse) => {
  if ('count' in response) {
    return {
      count: response.count as number,
      results: response.results as NamedAPIResource[],
    };
  } else
    return {
      count: response.pokemon.length as number,
      results: response.pokemon.map((value) => value.pokemon) as NamedAPIResource[],
    };
};

export default responseAdapter;
