import { DefaultSearchParams } from "@/ts/DefaultSearchParamsType";

export default function createQueryString(params: DefaultSearchParams): string {
    const searchParams = new URLSearchParams();
    for (const key in params) {
        if (params[key]) {
            searchParams.append(key, params[key]);
        }
    }
    return `?${searchParams.toString()}`;
};