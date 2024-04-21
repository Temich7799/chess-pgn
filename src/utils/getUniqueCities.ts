import { CityRespone } from "@/lib/api/types";

export default function getUniqueCities(data: CityRespone[]) {
    return data.filter((city, index) => {
        return data.findIndex(obj => obj.city === city.city) === index;
    });
}