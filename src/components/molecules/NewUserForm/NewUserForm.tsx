'use client'

import React, { useState } from 'react';
import styles from './NewUserForm.module.scss';
import { Input } from '@/components/atoms/Input';
import LanguageSelect from '@/components/atoms/Input/LanguageSelect';
import { Button } from '@/components/atoms/Button/Button';
import { useAddUserMutation } from '@/lib/redux/api/userApi';
import { Month } from '@/ts/MonthType';
import { useLanguageContext } from '@/contexts/CurrentLanguageContext';
import getCurrentDate from '@/utils/getCurrentDate';
import StyledForm from '@/components/molecules/StyledForm/StyledForm';
import BirthdayInput from '@/components/atoms/BirthdayInput/BirthdayInput';

export type NewUserFormProps = {
	months: Array<Month>;
	placeholdres: {
		namePlaceholder: string;
		cityPlaceholder: string;
		langPlaceholder: string;
		secondLangPlaceholder: string;
		thirdLangPlaceholder: string;
	}
	buttonTitle: string;
	type?: 'user' | 'friend'
}

const NewUserForm: React.FC<NewUserFormProps> = ({ months, placeholdres, buttonTitle, type = 'user' }) => {

	const { currentMonthIndex, currentDay } = getCurrentDate();
	const { language } = useLanguageContext();

	const [formData, setFormData] = useState();

	const [addUser, { isLoading, isError }] = useAddUserMutation();

	const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData);
	};

	const onChangeHandler = ({ target }: any) => {

	}

	const { namePlaceholder, cityPlaceholder, langPlaceholder, secondLangPlaceholder, thirdLangPlaceholder } = placeholdres;

	return (
		<StyledForm>
			<form onSubmit={onSubmitHandler} style={{ flexDirection: 'column' }}>
				<Input type="label" id="name" placeholder={namePlaceholder} onChange={onChangeHandler} />
				<BirthdayInput months={months} initialMonthIndex={currentMonthIndex} initialDay={currentDay} onChangeHandler={(value, key) => { }} />
				<Input type="label" id="city" placeholder={cityPlaceholder} onChange={onChangeHandler} />
				<Input type="email" id="email" placeholder="Email" onChange={onChangeHandler} />
				<LanguageSelect defaultValue={langPlaceholder} selectedLanguage={language} onChange={onChangeHandler} />
				<LanguageSelect defaultValue={secondLangPlaceholder} selectedLanguage="none" onChange={onChangeHandler} />
				<LanguageSelect defaultValue={thirdLangPlaceholder} selectedLanguage="none" onChange={onChangeHandler} />
				<Button type='submit' className={styles.submitBtn}>{buttonTitle}</Button>
			</form >
		</StyledForm>
	);
};

export default NewUserForm;
