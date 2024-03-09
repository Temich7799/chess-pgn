import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CheckUserResponse, CityRespone, GetUserQuery, GetUserResponse } from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env['REACT_APP_API'],
  credentials: 'same-origin',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const Controller = createApi({
  // reducerPath: 'AuthController',

  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCities: builder.query<CityRespone[], void>({
      query: () => `cities`,
    }),
    checkUser: builder.query({
      query: (email) => `checkUser?email=${email}`,
    }),
    getUserData: builder.query<GetUserResponse[], GetUserQuery>({
      query: ({ birthday, city }) => `getUserData?birthday=${birthday}&city=${city}`,
    }),
    addUser: builder.mutation({
      query: (userData) => ({
        url: '/addUser',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useLazyCheckUserQuery,
  useLazyGetUserDataQuery,
  useGetCitiesQuery,
} = Controller;
