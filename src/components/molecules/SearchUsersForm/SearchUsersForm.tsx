'use client'

import React, { useState } from 'react';
import styles from './SearchUsersForm.module.scss';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button/Button';
import MonthSelect from '@/components/atoms/Input/MonthSelect';
import DaySelect from '@/components/atoms/Input/DaySelect';
import { Month } from '@/ts/MonthType';
import { Text } from '@/components/atoms/Text/Text';
import { DefaultSearchParams } from '@/ts/DefaultSearchParamsType';
import createQueryString from '@/utils/createQueryString';

type SearchUsersFormProps = {
  months: Array<Month>;
  currentMonth?: number;
  currentDay?: number;
  currentCity?: string;
  title: string;
  buttonTitle: string;
  cityLabel: string;
};

export const SearchUsersForm: React.FC<SearchUsersFormProps> = ({ currentMonth: initialMonthIndex = 1, currentDay: initialDay = 1, currentCity: initialCity, title, buttonTitle, cityLabel, months }) => {

  const [{ countDates }, setSelectedMonth] = useState<Month>(months[initialMonthIndex - 1]);
  const [formData, setFormData] = useState<DefaultSearchParams>({
    month: `${initialMonthIndex}`,
    day: `${initialDay}`,
    city: initialCity,
  });

  const onChangeHandler = (value: string | number, key: string) => {
    setFormData({
      ...formData,
      [key]: value,
    })
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const queryString = createQueryString(formData);
    window.location.href = window.location.pathname + queryString;
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const selectedMonthIndex = parseInt(e.target.value);
    const selectedMonth = months[selectedMonthIndex - 1];

    setSelectedMonth(selectedMonth);
    onChangeHandler(selectedMonthIndex, 'month');
  };

  return (
    <>
      <div className={styles.search}>
        <Text tag="h1">{title}</Text>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className={styles.searchUsersForm}>
          <MonthSelect months={months} onChange={handleMonthChange} defaultValue={initialMonthIndex} />
          <DaySelect onChange={onChangeHandler} days={countDates} defaultValue={initialDay} />
          <Input type="cities" placeholder="cities" label={cityLabel} name="cities" defaultValue={initialCity} onChange={(e: any) => { onChangeHandler(e.target.value, 'city') }} />
          <Button type="submit">{buttonTitle}</Button>
        </div>
      </form>
    </>
  );
};
