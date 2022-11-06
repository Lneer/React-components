import responseAdapter from './responseAdapter';

const pagination = <T>(arr: T[], page: number, pageSize: number): T[] => {
  return arr.slice(pageSize * (page - 1), pageSize * page);
};

const pokemonTypePagination = <U extends ReturnType<typeof responseAdapter>>(
  adaptedResourceList: U,
  page: number,
  pageSize: number
) => {
  return {
    count: adaptedResourceList.results.length,
    results: pagination(adaptedResourceList.results, page, pageSize),
  };
};

export default pokemonTypePagination;
