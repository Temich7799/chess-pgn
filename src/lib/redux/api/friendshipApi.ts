import { GetUserResponse } from "@/ts/GetUserResponseType";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const FriendshipApi = createApi({
    baseQuery,
    endpoints: (builder) => ({
        addFriendship: builder.mutation<void, { userId: string, friendId: string }>({
            query: ({ userId, friendId }) => ({
                url: '/addFriendship',
                method: 'POST',
                body: { userId, friendId },
            }),
        }),
        getAllFriends: builder.query<GetUserResponse[], string>({
            query: (userId) => `getAllFriends?userId=${userId}`,
        }),
    }),
});