import { getAPIResourceList, responseAdapter } from 'utils';

const apiLoader = async (url: string) => {
  const resourceList = await getAPIResourceList(url);
  return responseAdapter(resourceList);
};

export default apiLoader;
