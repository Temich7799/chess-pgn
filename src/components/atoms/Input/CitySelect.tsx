import React from 'react';
import styles from './Input.module.scss';
import { CityRespone } from '@/ts/CityResponseType';

interface CitySelectProps {
    cities: CityRespone[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({ cities, onChange }) => {
    return (
        <select className={styles.select} onChange={onChange}>
            {cities.map((city, index) => (
                <option key={`${index}_${city.city}`} value={city.city}>
                    {city.city}
                </option>
            ))}
        </select>
    );
};

export default CitySelect;
