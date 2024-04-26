'use client'

import React, { useCallback, useEffect, useState } from 'react';
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
import { Text } from '@/components/atoms/Text/Text';
import { useAddFriendshipMutation } from '@/lib/redux/api/friendshipApi';
import { useRouter } from 'next/navigation';

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
	type?: 'user' | 'friend';
	userId?: string;
}

const NewUserForm: React.FC<NewUserFormProps> = ({ months, placeholdres, buttonTitle, type = 'user', userId }) => {

	const { currentMonthIndex, currentDay } = getCurrentDate();
	const { language } = useLanguageContext();

	const router = useRouter();

	const [formData, setFormData] = useState<any>({
		month: `${currentMonthIndex}`,
		day: `${currentDay}`,
		language,
	});
	const [friendId, setFriendId] = useState<string>();

	const [addUser, { data, isLoading: isUserProcessing, isError: isUserError, isSuccess: isUserSuccess }] = useAddUserMutation();
	const [addFriendsip, { isLoading: isFriendshipProccessing, isError: isFriendshopError, isSuccess: isFriendshipSuccess }] = useAddFriendshipMutation();

	const isLoading = isUserProcessing || isFriendshipProccessing;
	const isError = isUserError || isFriendshopError;
	const isSuccess = isUserSuccess || isFriendshipSuccess;

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {

		e.preventDefault();

		await addUser(formData);

		(type === 'friend' && data) && data.data && setFriendId(data.data.userId);
	};

	const onChangeHandler = ({ target }: any) => {
		target.id
			? setFormData({ ...formData, [target.id]: target.value })
			: console.error('key arg is not specified');
	}

	const onBirthdayChangeHandler = useCallback((value: string | number, key: string) => {
		setFormData({ ...formData, [key]: value })
	}, [formData]);

	useEffect(() => {
		if (userId && type === 'friend' && friendId) {
			(isUserSuccess && friendId) && addFriendsip({ userId, friendId });
		}
	}, [friendId]);

	useEffect(() => {
		// isSuccess && router.back();
	}, [isSuccess]);

	const { namePlaceholder, cityPlaceholder, langPlaceholder, secondLangPlaceholder, thirdLangPlaceholder } = placeholdres;

	return (
		<StyledForm>
			<form onSubmit={onSubmitHandler} style={{ flexDirection: 'column' }}>
				<Input type="label" required id="name" placeholder={namePlaceholder} onChange={onChangeHandler} />
				<BirthdayInput months={months} initialMonthIndex={currentMonthIndex} initialDay={currentDay} onChangeHandler={onBirthdayChangeHandler} />
				<Input type="label" id="city" placeholder={cityPlaceholder} onChange={onChangeHandler} />
				<Input required type="email" id="email" placeholder="Email" onChange={onChangeHandler} />
				<LanguageSelect id="language" defaultValue={langPlaceholder} selectedLanguage={formData.language} onChange={onChangeHandler} />
				<LanguageSelect id="foreign" defaultValue={secondLangPlaceholder} selectedLanguage={formData.foreign} onChange={onChangeHandler} />
				<LanguageSelect id="another_foreign" defaultValue={thirdLangPlaceholder} selectedLanguage={formData.another_foreign } onChange={onChangeHandler} />
				<Button type='submit' disabled={isLoading} className={styles.submitBtn}>{isLoading ? 'Sending..' : buttonTitle}</Button>
				{isError && <Text tag='p' style={{ color: 'red' }}>Error. Try again</Text>}
			</form >
		</StyledForm>
	);
};

export default NewUserForm;
