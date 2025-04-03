import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from '../../../config';

export const countQuotesApi = createApi({
  reducerPath: 'countQuotesApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getQuotesCount: builder.query({
      query: (username) => `user/level/${username}`,
    }),
  }),
});

export const { useGetQuotesCountQuery } = countQuotesApi;
