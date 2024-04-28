'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './NewUserFormFull.module.scss';
import { Input } from '@/components/atoms/Input';
import LanguageSelect from '@/components/atoms/Input/LanguageSelect';
import { Button } from '@/components/atoms/Button/Button';
import { Month } from '@/ts/MonthType';
import { useLanguageContext } from '@/contexts/CurrentLanguageContext';
import getCurrentDate from '@/utils/getCurrentDate';
import StyledForm from '@/components/molecules/StyledForm/StyledForm';
import BirthdayInput from '@/components/atoms/BirthdayInput/BirthdayInput';
import { Text } from '@/components/atoms/Text/Text';
import { useAddFriendshipMutation } from '@/lib/redux/api/userApi';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRegisterMutation } from '@/lib/redux/api/authApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const NewUserFormFull: React.FC<NewUserFormProps> = ({ months, placeholdres, buttonTitle, type = 'user', userId }) => {

	const { currentMonthIndex, currentDay } = useMemo(() => getCurrentDate(), []);

	const { language } = useLanguageContext();
	const searchParams = useSearchParams();

	const router = useRouter();

	const initialMonth = useMemo(() => parseInt(searchParams.get('month') || `${currentMonthIndex}`), [currentMonthIndex, searchParams]);
	const initialDay = useMemo(() => parseInt(searchParams.get('day') || `${currentDay}`), [currentDay, searchParams]);
	const initialName = useMemo(() => searchParams.get('name') || undefined, [searchParams]);

	const [formData, setFormData] = useState<any>(() => ({
		month: initialMonth,
		day: initialDay,
		name: initialName,
		language,
	}));

	const [friendId, setFriendId] = useState<string>();

	const [register, { data, isLoading: isRegisterProcessing, isError: isRegisterError, isSuccess: isRegisterSuccess }] = useRegisterMutation();
	const [addFriendship, { isLoading: isFriendshipProcessing, isError: isFriendshipError, isSuccess: isFriendshipSuccess }] = useAddFriendshipMutation();

	const isLoading = isRegisterProcessing || isFriendshipProcessing;
	const isError = isRegisterError || isFriendshipError;
	const isSuccess = isRegisterSuccess && isFriendshipSuccess;

	const onSubmitHandler = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await register(formData);
		(type === 'friend' && data?.data) && setFriendId(data.data.userId);
	}, [data, formData, type]);

	const onChangeHandler = useCallback(({ target }: any) => {
		target.id ? setFormData((prevData: any) => ({ ...prevData, [target.id]: target.value })) : console.error('key arg is not specified');
	}, []);

	const onBirthdayChangeHandler = useCallback((value: string | number, key: string) => {
		setFormData((prevData: any) => ({ ...prevData, [key]: value }));
	}, []);

	useEffect(() => {
		console.log(userId, type, friendId)
		if (userId && type === 'friend' && friendId) {
			(isRegisterSuccess && friendId) && addFriendship({ userId, friendId });
		}
	}, [addFriendship, friendId, isRegisterSuccess, type, userId]);

	const { namePlaceholder, cityPlaceholder, langPlaceholder, secondLangPlaceholder, thirdLangPlaceholder } = placeholdres;

	const pathname = usePathname();

	useEffect(() => {
		if (isLoading) {
			toast.info('Adding user...', { autoClose: false });
		} else if (isSuccess) {
			toast.success('User added successfully!');
			if (pathname.includes('user')) {
				router.back();
			}
			else router.push('/auth/login');
		} else if (isError) {
			toast.error('Error. Please try again.');
		}
	}, [isLoading, isSuccess, isError]);

	return (
		<StyledForm>
			<form onSubmit={onSubmitHandler} style={{ flexDirection: 'column' }}>
				<Input type="label" required id="name" defaultValue={initialName} placeholder={namePlaceholder} onChange={onChangeHandler} />
				<BirthdayInput months={months} initialMonthIndex={initialMonth} initialDay={initialDay} onChangeHandler={onBirthdayChangeHandler} />
				<Input type="label" id="city" placeholder={cityPlaceholder} onChange={onChangeHandler} />
				<Input required type="email" id="email" placeholder="Email" onChange={onChangeHandler} />
				<Input required type="password" id="password" placeholder="Password" onChange={onChangeHandler} />
				<LanguageSelect id="language" defaultValue={langPlaceholder} selectedLanguage={formData.language} onChange={onChangeHandler} />
				<LanguageSelect id="foreign" defaultValue={secondLangPlaceholder} selectedLanguage={formData.foreign} onChange={onChangeHandler} />
				<LanguageSelect id="another_foreign" defaultValue={thirdLangPlaceholder} selectedLanguage={formData.another_foreign} onChange={onChangeHandler} />
				<Button type='submit' disabled={isLoading} className={styles.submitBtn}>{isLoading ? 'Sending..' : buttonTitle}</Button>
				{isError && <Text tag='p' style={{ color: 'red' }}>Error. Try again</Text>}
			</form>
		</StyledForm>
	);
};

export default NewUserFormFull;
