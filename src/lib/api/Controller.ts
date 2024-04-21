import { CityRespone } from '@/ts/CityResponseType';
import { GetUserQuery } from '@/ts/GetUserQueryType';
import { GetUserResponse } from '@/ts/GetUserResponseType';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_API_BASE_URL,
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
      query: () => `api/cities`,
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
  useCheckUserQuery,
  useGetUserDataQuery,
  useLazyGetUserDataQuery,
  useGetCitiesQuery,
} = Controller;
