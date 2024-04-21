'use client'

import React, { useState } from 'react';
import styles from './SignupForm.module.scss';
import { Input } from '@/components/atoms/Input';
import DaySelect from '@/components/atoms/Input/DaySelect';
import MonthSelect from '@/components/atoms/Input/MonthSelect';
import LanguageSelect from '@/components/atoms/Input/LanguageSelect';
import { Button } from '@/components/atoms/Button/Button';
import { useAddUserMutation } from '@/lib/api/Controller';
import { Month } from '@/ts/MonthType';
import { useCurrentDateContext } from '@/lib/contexts/CurrentDateContext';
import { useLanguageContext } from '@/lib/contexts/CurrentLanguageContext';

export type SignupFormProps = {
	months: Array<Month>;
	placeholdres: {
		namePlaceholder: string;
		cityPlaceholder: string;
		langPlaceholder: string;
		secondLangPlaceholder: string;
		thirdLangPlaceholder: string;
	}
	buttonTitle: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ months, placeholdres, buttonTitle }) => {

	const { currentMonthIndex, currentDay } = useCurrentDateContext();
	const { language } = useLanguageContext();

	const [formData, setFormData] = useState();
	const [{ countDates }, setSelectedMonth] = useState<Month>(months[0]);

	const [addUser, { isLoading, isError }] = useAddUserMutation();

	const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData);
	};

	const onChangeHandler = ({ target }: any) => {

	}

	const handleMonthChange = (selectedMonth: Month) => {
		setSelectedMonth(selectedMonth);
	};

	const { namePlaceholder, cityPlaceholder, langPlaceholder, secondLangPlaceholder, thirdLangPlaceholder } = placeholdres;

	return (
		<form onSubmit={onSubmitHandler} className={styles.signupform}>
			<Input type="label" id="name" placeholder={namePlaceholder} onChange={onChangeHandler} />
			{/* {!!errors.name && (
          <Text tag="span" size="xs" theme="alert">
            {errors?.name?.message}
          </Text>
        )} */}
			<MonthSelect /**className={errors.city ? styles.errors : ''} */ months={months} defaultValue={currentMonthIndex} onChange={handleMonthChange} />
			<DaySelect /**className={errors.city ? styles.errors : ''} */ days={countDates} defaultValue={currentDay} onChange={onChangeHandler} />
			<Input type="label" id="city" placeholder={cityPlaceholder} onChange={onChangeHandler} />
			{/* {!!errors.city && (
          <Text tag="span" size="xs" theme="alert">
            {errors?.city?.message}
          </Text>
        )} */}
			<Input type="email" id="email" placeholder="Email" onChange={onChangeHandler} />
			{/* {!!errors.email &&  (
          <Text tag="span" size="xs" theme="alert">
            {errors?.email?.message}
          </Text>
        )} */}
			<LanguageSelect defaultValue={langPlaceholder} selectedLanguage={language} onChange={onChangeHandler} />
			{/* {!!errors.language && (
          <Text tag="span" size="xs" theme="alert">
            {errors?.language?.message}
          </Text>
        )} */}
			<LanguageSelect defaultValue={secondLangPlaceholder} selectedLanguage="none" onChange={onChangeHandler} />
			<LanguageSelect defaultValue={thirdLangPlaceholder} selectedLanguage="none" onChange={onChangeHandler} />
			<Button type='submit' className={styles.submitBtn}>{buttonTitle}</Button>
		</form >
	);
};

export default SignupForm;
