import { User } from "@/ts/UserType";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const friendshipApi = createApi({
    baseQuery,
    endpoints: (builder) => ({
        addFriendship: builder.mutation<void, { userId: string, friendId: string }>({
            query: ({ userId, friendId }) => ({
                url: '/api/addFriendship',
                method: 'POST',
                body: { userId, friendId },
            }),
        }),
        getAllFriends: builder.query<User[], string>({
            query: (userId) => `/api/getAllFriends?userId=${userId}`,
        }),
    }),
});

export const {
    useAddFriendshipMutation,
    useGetAllFriendsQuery,
} = friendshipApi;