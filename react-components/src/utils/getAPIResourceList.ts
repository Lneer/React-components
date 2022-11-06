import axios from 'axios';
import { memo } from './memoizedFunc';

const getAPIResourceList = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default memo(getAPIResourceList);
