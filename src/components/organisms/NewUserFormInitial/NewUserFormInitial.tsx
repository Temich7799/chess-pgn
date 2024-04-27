'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BirthdayInput from '@/components/atoms/BirthdayInput/BirthdayInput';
import { Button } from '@/components/atoms/Button/Button';
import { Input } from '@/components/atoms/Input';
import { Text } from '@/components/atoms/Text/Text';
import StyledForm from '@/components/molecules/StyledForm/StyledForm';
import createQueryString from '@/utils/createQueryString';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { Month } from '@/ts/MonthType';

type NewUserFormInitialProps = {
    months: Array<Month>;
    initialMonthIndex: number;
    initialDay: number;
    onBirthdayChange?: Dispatch<SetStateAction<string>>;
    title?: string;
    actionPath?: string;
}

const NewUserFormInitial: React.FC<NewUserFormInitialProps> = ({ months, initialMonthIndex, initialDay, onBirthdayChange, title, actionPath = '/add-friend' }) => {
    const [formData, setFormData] = useState<{ month: string; day: string; name: string }>({
        month: `${initialMonthIndex}`,
        day: `${initialDay}`,
        name: '',
    });

    const currentPath = usePathname();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleChange = useCallback((value: string | number, key: string) => {
        setFormData(prevData => ({ ...prevData, [key]: value }));
    }, []);

    const onChangeNameHandler = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(target.value, 'name');
    }, [handleChange]);

    const queryString = useMemo(() => createQueryString({ ...formData, birthday: undefined }), [formData]);

    useEffect(() => {
        if (onBirthdayChange && formData.month && formData.day) {
            onBirthdayChange(`${formData.day}/${formData.month}`);
        }
    }, [formData, onBirthdayChange]);

    return (
        <StyledForm>
            {title && <Text tag="h2">{title}</Text>}
            <form onSubmit={handleSubmit}>
                <Input type="text" placeholder="Name" required onChange={onChangeNameHandler} />
                <BirthdayInput months={months} initialMonthIndex={initialMonthIndex} initialDay={initialDay} onChangeHandler={handleChange} />
                <Link href={currentPath + actionPath + queryString}>
                    <Button>Continue</Button>
                </Link>
            </form>
        </StyledForm>
    );
};

export default NewUserFormInitial;
