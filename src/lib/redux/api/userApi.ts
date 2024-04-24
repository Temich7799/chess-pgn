import { GetUserQuery } from '@/ts/GetUserQueryType';
import { GetUserResponse } from '@/ts/GetUserResponseType';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const userApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getAllUsers: builder.query<GetUserResponse[], GetUserQuery>({
      query: ({ birthday, city }) => `getAllUsers?birthday=${birthday}&city=${city}`,
    }),
    addUser: builder.mutation({
      query: (userData) => ({
        url: '/addUser',
        method: 'POST',
        body: userData,
      }),
    }),
    checkUser: builder.query({
      query: (email) => `checkUser?email=${email}`,
    }),
  }),
});

export const {
  useAddUserMutation,
  useLazyCheckUserQuery,
  useCheckUserQuery,
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
} = userApi;
