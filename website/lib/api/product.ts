import axios from 'axios';

import { BASE_URL } from '../../utils/constant';

export const getQuery = (limit: number, page: number): string =>
  `limit=${limit}&offset=${page ? page * limit : 0}`;

export const ProductApi = {
  byColor: (color, page, limit = 10) =>
    axios.get(`${BASE_URL}/${color}?${getQuery(limit, page)}`),
};

// export const ProductApi = (color, page, limit = 10) =>
//   axios.get(`${BASE_URL}/${color}?${getQuery(limit, page)}`);
