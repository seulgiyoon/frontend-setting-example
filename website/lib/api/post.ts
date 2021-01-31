import axios from 'axios';

import { JSON_BASE_URL } from '../../utils/constant';

export const getQuery = (page: number): string => `?_page=${page && page}`;

export const PostApi = {
  all: async (page) => {
    try {
      const result = await axios.get(
        `${JSON_BASE_URL}/posts/${getQuery(page)}`,
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
};
