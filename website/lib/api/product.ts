import axios from 'axios';

import { WINE_BASE_URL } from '../../utils/constant';

export const getQuery = (limit: number, page: number): string =>
  `limit=${limit}&offset=${page ? page * limit : 0}`;

export const ProductApi = {
  byColor: async (color) => {
    try {
      const result = await axios.get(`${WINE_BASE_URL}/${color}`);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
};

// export const ProductApi = (color, page, limit = 10) =>
//   axios.get(`${BASE_URL}/${color}?${getQuery(limit, page)}`);
