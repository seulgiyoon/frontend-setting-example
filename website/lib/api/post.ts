import axios from 'axios';
import * as Sentry from '@sentry/node';

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
      if (process.env.NODE_ENV === 'production') {
        Sentry.captureException(error);
      }
      console.log(error);
    }
  },
};
