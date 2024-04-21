import React from 'react';
import styles from './Input.module.scss';
import { Month } from '@/ts/MonthType';

interface MonthSelectProps {
    months: Month[];
    onChange: (selectedMonth: Month) => void;
    defaultValue?: number;
}

const MonthSelect: React.FC<MonthSelectProps> = (props) => {

    const { months, onChange } = props;

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMonthIndex = parseInt(e.target.value);
        onChange(months[selectedMonthIndex - 1]);
    };

    return (
        <select {...props} className={styles.select} onChange={handleMonthChange}>
            {months.map((month) => (
                <option key={month.name} value={month.num}>
                    {month.name}
                </option>
            ))}
        </select>
    );
};

export default MonthSelect;
