import { useEffect, useState } from "react";
import DaySelect from "../Input/DaySelect";
import MonthSelect from "../Input/MonthSelect";
import { Month } from "@/ts/MonthType";
import styles from './BirthdayInput.module.scss';

type BirthdayInputProps = {
    onChangeHandler: (value: string | number, key: string) => void;
    months: Array<Month>;
    initialMonthIndex: number;
    initialDay: number;
};

const BirthdayInput: React.FC<BirthdayInputProps> = ({ onChangeHandler, months, initialMonthIndex, initialDay }) => {

    const [selectedMonth, setSelectedMonth] = useState<Month>(months[initialMonthIndex - 1]);
    const [selectedDay, setSelectedDay] = useState<number | string>(initialDay);

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const selectedMonthIndex = parseInt(e.target.value);
        const selectedMonth = months[selectedMonthIndex - 1];

        setSelectedMonth(selectedMonth);
    };

    const handleDayChange = (value: string | number, key: string) => {
        setSelectedDay(value);
    }

    useEffect(() => {
        onChangeHandler(`${selectedDay}/${selectedMonth.num}`, 'birthday');
    }, [selectedDay, selectedMonth]);

    return (
        <div className={styles.birthdayInput}>
            <MonthSelect months={months} onChange={handleMonthChange} defaultValue={initialMonthIndex} />
            <DaySelect onChange={handleDayChange} days={selectedMonth.countDates} defaultValue={initialDay} />
        </div>
    )
}

export default BirthdayInput;