import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styles from './SignUpPage.module.scss';
import { emailValidator, baseValidator } from '../../../validation';
import { Input, InputDate, InputSelect } from '../../atoms/Input';
import { useNavigate } from 'react-router-dom';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';
import { useTranslation } from 'react-i18next';
import { useAddUserMutation } from '../../../api/Controller';
import { useState } from 'react';
import { useMonth } from '../../../hooks/useMonth';

export type FormValues = {
  name: string;
  email: string;
  month: string;
  day: number;
  city: string;
  language: string;
  foreign_language?: string;
  another_foreign_language?: string;
};

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'all',
  });
  const navigate = useNavigate()
  const { t } = useTranslation();
  const [addUser, { isLoading, isError }] = useAddUserMutation();
  const [error, setError] = useState<string>()
  const { month } = useMonth()
  const selectedMonth = watch('month')

  const handleSubmitSignUp = async ({ name, month, day, city, email, language, foreign_language, another_foreign_language }: FormValues) => {
    try {
      await addUser({
        name,
        birthday: `${day}/${month}`,
        city,
        email,
        language,
        foreign_language,
        another_foreign_language
      }).unwrap();
      navigate('/');
    } catch (err) {
      if (err && typeof err === 'object' && 'data' in err && typeof err.data === 'string') {
        setError(err.data)
      }
      console.log(err)
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handleSubmitSignUp(data);
  };

  return (
    <div className={styles.signup}>
      <Text tag="h1">{t('signup')}</Text>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input type="label" id="name" placeholder={t('name')} {...register('name', baseValidator)} />
        {!!errors.name && (
          <Text tag="span" size="xs" theme="alert">
            {errors?.name?.message}
          </Text>
        )}
        <InputSelect className={errors.city ? styles.errors : ''} type='month' month={month} {...register('month', baseValidator)} />
        <InputSelect className={errors.city ? styles.errors : ''} type='day' month={month} {...register('day', baseValidator)} selectedMonth={selectedMonth} />
        <Input type="label" id="city" placeholder={t('city')} {...register('city', baseValidator)} />
        {!!errors.city && (
          <Text tag="span" size="xs" theme="alert">
            {errors?.city?.message}
          </Text>
        )}
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register('email', emailValidator)}
        />
        {!!errors.email && (
          <Text tag="span" size="xs" theme="alert">
            {errors?.email?.message}
          </Text>
        )}
        <InputSelect type='language' {...register('language', baseValidator)} />
        {!!errors.language && (
          <Text tag="span" size="xs" theme="alert">
            {errors?.language?.message}
          </Text>
        )}
        <InputSelect type='foreign' {...register('foreign_language')} />
        <InputSelect type='another_foreign' {...register('another_foreign_language')} />

        <Button disabled={!isValid} type='submit' className={styles.submitBtn}>
          Зарегестрироваться
        </Button>
      </form>
      {error}
    </div>
  );
}
