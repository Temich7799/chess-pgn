import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CheckUserResponse } from './types';

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
    checkUser: builder.query({
      query: (email) => `checkUser?email=${email}`,
    }),
    getUserData: builder.query({
      query: ({ birthday, city }) => `getUserData?date=${birthday}&city=${city}`,
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

export const { useCheckUserQuery, useGetUserDataQuery, useAddUserMutation } = Controller;
