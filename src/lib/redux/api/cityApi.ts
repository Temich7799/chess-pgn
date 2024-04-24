import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { CityRespone } from "@/ts/CityResponseType";

export const CityController = createApi({
    baseQuery,
    endpoints: (builder) => ({
        getCities: builder.query<CityRespone[], void>({
            query: () => `api/cities`,
        }),
    }),
});

export const {
    useGetCitiesQuery,
} = CityController;
