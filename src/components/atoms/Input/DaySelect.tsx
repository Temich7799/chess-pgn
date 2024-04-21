import React from 'react';
import styles from './Input.module.scss';

interface DaySelectProps {
    days: number[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    defaultValue?: number;
}

const DaySelect: React.FC<DaySelectProps> = (props) => {

    const { days, onChange } = props;

    return (
        <select {...props} className={styles.select} onChange={onChange}>
            {days.map((day, index) => (
                <option key={index} value={day}>
                    {day}
                </option>
            ))}
        </select>
    );
};

export default DaySelect;
