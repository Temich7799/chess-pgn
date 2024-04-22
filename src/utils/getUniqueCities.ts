import { CityRespone } from "@/ts/CityResponseType";

export default function getUniqueCities(data: CityRespone[]) {
    return data.filter((city, index) => {
        return data.findIndex(obj => obj.city === city.city) === index;
    });
}