import { NamedAPIResourceList, TypeResponse } from 'types/api/responseTypes';

const responseAdapter = (response: NamedAPIResourceList | TypeResponse) => {
  if ('count' in response) {
    return {
      count: response.count,
      results: response.results,
    };
  } else
    return {
      count: response.pokemon.length,
      results: response.pokemon.map((value) => value.pokemon),
    };
};

export default responseAdapter;
