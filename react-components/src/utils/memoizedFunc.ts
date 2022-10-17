import { NamedAPIResourceList } from 'types/api/responseTypes';

export const memo = (fn: (url: string) => Promise<NamedAPIResourceList>) => {
  const memoMap = new Map();
  return async (url: string): Promise<NamedAPIResourceList> => {
    const key = JSON.stringify(url);
    if (!memoMap.has(key)) {
      memoMap.set(key, await fn(url));
    }
    return memoMap.get(key);
  };
};
