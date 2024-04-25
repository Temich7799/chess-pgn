import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { CityRespone } from "@/ts/CityResponseType";

export const cityApi = createApi({
    baseQuery,
    endpoints: (builder) => ({
        getAllCities: builder.query<CityRespone[], void>({
            query: () => `/api/cities`,
        }),
    }),
});

export const {
    useGetAllCitiesQuery,
} = cityApi;
