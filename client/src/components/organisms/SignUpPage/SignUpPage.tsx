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

export type FormValues = {
  name: string;
  email: string;
  birthday: string;
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
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'all',
  });
  const navigate = useNavigate()
  const { t } = useTranslation();
  const [addUser, { isLoading, isError }] = useAddUserMutation();
  const [error, setError] = useState<string>()

  const handleSubmitSignUp = async ({ name, birthday, city, email, language, foreign_language, another_foreign_language }: FormValues) => {
    try {
      await addUser({
        name,
        birthday,
        city,
        email,
        language,
        foreign_language,
        another_foreign_language
      }).unwrap();
      navigate('/');
    } catch (err) {
      if (err && typeof err === 'object' && 'data' in err && typeof err.data === 'string') {
        console.log('here')
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
        <Controller
          name="birthday"
          control={control}
          rules={baseValidator}
          render={({ field }) => (
            <InputDate {...field} label={t('birthday')} />
          )}
        />
        {errors.birthday && <span>{errors.birthday.message}</span>}
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
        <InputSelect type='native' {...register('language', baseValidator)} />
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
      {/* {error && typeof error === 'object' && 'data' in error && typeof error.data === 'string' && <div>Error: {error.data}</div>} */}
    </div>
  );
}
