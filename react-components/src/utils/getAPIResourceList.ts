import axios from 'axios';
import { memo } from './memoizedFunc';

export const getAPIResourceList = async (url: string) => {
  try {
    const response = await axios.get(url);
    console.log('request');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const memoizedGetAPIResourceList = memo(getAPIResourceList);
