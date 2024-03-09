import React, { FormEvent, FormEventHandler, HTMLAttributes, useEffect, useState } from 'react'
import styles from './SearchBar.module.scss'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';


import { Text } from '../../atoms/Text/Text'
import { Input, InputDate, InputSelect } from '../../atoms/Input'
import { Button } from '../../atoms/Button/Button'
import { baseValidator, emailValidator } from '../../../validation';
import { useCheckUserQuery } from '../../../api/Controller';

export type userData = {
  birthday: string;
  email: string,
  city: string,
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
  // const [email, setEmail] = useState('')
  const emailValue = watch('email');

  const { data, isLoading } = useCheckUserQuery(emailValue);

  useEffect(() => {
    console.log(data)
  }, [data])

  // const handleChangeEmail = (e: FormEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value)
  // }

  const handleSearch = ({ birthday, email, city }: userData) => {

  }

  const onSubmit: SubmitHandler<userData> = (data) => {
    handleSearch(data)
  }

  return (
    <div className={styles.searchblock}>
      <Text tag="h1" >Введите параметры поиска</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.searchbar}>
          <Controller
            name="birthday"
            control={control}
            rules={baseValidator}
            render={({ field }) => (
              <InputDate className={errors.birthday ? styles.errors : ''} {...field} />
            )}
          />
          <Input className={errors.city ? styles.errors : ''} type='text' placeholder='city' {...register('city', baseValidator)} />
          <Input className={errors.email ? styles.errors : ''} type='email' placeholder='email' {...register('email', emailValidator)} />
          <Button type='submit'>Search</Button>
        </div>
      </form>
    </div>
  )
}
