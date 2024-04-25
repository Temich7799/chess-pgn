import { GetUserQuery } from '@/ts/GetUserQueryType';
import { User } from '@/ts/UserType';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const userApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], GetUserQuery>({
      query: ({ birthday, city }) => `getAllUsers?birthday=${birthday}&city=${city}`,
    }),
    addUser: builder.mutation({
      query: (userData) => ({
        url: '/api/addUser',
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
