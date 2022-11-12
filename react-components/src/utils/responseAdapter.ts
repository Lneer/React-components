import { NamedAPIResource, NamedAPIResourceList, ResponseAdapter } from 'types/api/responseTypes';

function determinedInstance(
  toBeDetermined: ResponseAdapter
): toBeDetermined is NamedAPIResourceList {
  if ((toBeDetermined as NamedAPIResourceList).count) {
    return true;
  }
  return false;
}

const responseAdapter = (response: ResponseAdapter) => {
  if (determinedInstance(response)) {
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
