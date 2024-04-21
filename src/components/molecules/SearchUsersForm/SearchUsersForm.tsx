'use client'

import React, { useState } from 'react';
import styles from './SearchUsersForm.module.scss';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button/Button';
import { useLazyCheckUserQuery } from '../../../lib/api/Controller';
// import generateNumbersArray from '@/utils/generateNumbersArray';
import MonthSelect from '@/components/atoms/Input/MonthSelect';
import DaySelect from '@/components/atoms/Input/DaySelect';
import { Month } from '@/ts/MonthType';
import { Text } from '@/components/atoms/Text/Text';

type SearchUsersFormProps = {
  months: Array<Month>;
  currentMonth?: number;
  currentDay?: number;
  title: string;
  buttonTitle: string;
  cityLabel: string;
};

export const SearchUsersForm: React.FC<SearchUsersFormProps> = ({ currentMonth: initialMonthIndex = 1, currentDay: initialDay = 1, title, buttonTitle, cityLabel, months }) => {

  const [{ countDates }, setSelectedMonth] = useState<Month>(months[initialMonthIndex - 1]);
  const [formData, setFormData] = useState();

  const [checkUser] = useLazyCheckUserQuery();

  const onChangeHandler = ({ target }: any) => {
    // if (target.name) {
    //   const { name, value } = target;
    //   setFormData((prevState) => ({ ...prevState, [name]: value }));
    // } else throw new Error('"name" attribute was not provided');
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const handleMonthChange = (selectedMonth: Month) => {
    setSelectedMonth(selectedMonth);
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
          <Input type="cities" placeholder="cities" label={cityLabel} name="cities" onChange={onChangeHandler} />
          <Button type="submit">{buttonTitle}</Button>
        </div>
      </form>
    </>
  );
};
