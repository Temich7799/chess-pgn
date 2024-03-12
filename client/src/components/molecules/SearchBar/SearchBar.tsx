import React, { FormEvent, FormEventHandler, HTMLAttributes, useEffect, useState } from 'react'
import styles from './SearchBar.module.scss'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';


import { Text } from '../../atoms/Text/Text'
import { Input, InputDate, InputSelect } from '../../atoms/Input'
import { Button } from '../../atoms/Button/Button'
import { baseValidator, emailValidator } from '../../../validation';
import { useGetCitiesQuery, useLazyCheckUserQuery, useLazyGetUserDataQuery } from '../../../api/Controller';
import { useNavigate } from 'react-router-dom';
import { GetUserResponse } from '../../../api/types';
import { Table } from '../../atoms/Table/Table';
import { useTranslation } from 'react-i18next';
import { useMonth } from '../../../hooks/useMonth';

export type userData = {
  day: number;
  month: string;
  email: string,
  city?: string,
}

export const SearchBar = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<userData>({
    mode: 'all',
    defaultValues: {},
  });

  const [checkUser, { isError }] = useLazyCheckUserQuery();
  const [getUserData] = useLazyGetUserDataQuery();
  const navigate = useNavigate()
  const [usersData, setUsersData] = useState<GetUserResponse[]>()
  const { data } = useGetCitiesQuery()
  const uniqueCities = data?.filter((city, index) => {
    return data.findIndex(obj => obj.city === city.city) === index;
  });

  const { t } = useTranslation();
  const { month } = useMonth()
  const selectedMonth = watch('month')

  const handleSearch = async ({ day, month, email, city }: userData) => {
    try {
      const isExist = await checkUser(email)
      if (isExist.data.exists) {
        const data = await getUserData({ birthday: `${day}/${month}`, city: city })
        setUsersData(data?.data)
      } else {
        navigate('/signup')
      }
    } catch (error) {
    }
  }

  const onSubmit: SubmitHandler<userData> = (data) => {
    handleSearch(data)
  }

  return (
    <div className={styles.searchblock}>
      <div className={styles.search}>
        <Text tag="h1" >{t('choose')}</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.searchbar}>
            <InputSelect className={errors.city ? styles.errors : ''} type='month' month={month} label={t('month')} {...register('month', baseValidator)} />
            <InputSelect className={errors.city ? styles.errors : ''} type='day' month={month} label={t('day')} {...register('day', baseValidator)} selectedMonth={selectedMonth} />
            <InputSelect className={errors.city ? styles.errors : ''} type='cities' city={uniqueCities} {...register('city')} label={t('city')} />
            <Input className={errors.email ? styles.errors : ''} type='email' placeholder='email' {...register('email', emailValidator)} label={t('email')} />
            <Button type='submit'>{t('search_btn')}</Button>
          </div>
        </form>
      </div>
      {!!usersData && <Table {...usersData} />}
    </div>
  )
}
