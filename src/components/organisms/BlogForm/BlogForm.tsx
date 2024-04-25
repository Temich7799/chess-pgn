'use client'

import BirthdayInput from '@/components/atoms/BirthdayInput/BirthdayInput';
import { Button } from '@/components/atoms/Button/Button';
import { Input } from '@/components/atoms/Input';
import StyledForm from '@/components/molecules/StyledForm/StyledForm';
import { Month } from '@/ts/MonthType';
import createQueryString from '@/utils/createQueryString';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

type BlogFormProps = {
    months: Array<Month>;
    initialMonthIndex: number;
    initialDay: number;
    onBirthdayChange: Dispatch<SetStateAction<string>>
}

const BlogForm: React.FC<BlogFormProps> = ({ months, initialMonthIndex, initialDay, onBirthdayChange }) => {

    const [formData, setFormData] = useState<any>({
        month: `${initialMonthIndex}`,
        day: `${initialDay}`,
        name: '',
    });

    const [queryString, setQueryString] = useState<string>();

    const router = useRouter();

    const handleSubmit = (e: any) => {
        e.preventDefault;
    };

    const handleChange = useCallback((value: string | number, key: string) => {
        setFormData({ ...formData, [key]: value });
    }, []);

    const onChangeNameHandler = ({ target }: any) => { handleChange(target.value, 'name') }

    useEffect(() => {
        if (formData.month && formData.day) {
            onBirthdayChange(`${formData.day}/${formData.month}`)
        }
        const queryString = createQueryString({ ...formData, birthday: undefined });
        setQueryString(queryString);
    }, [formData]);

    return (
        <StyledForm>
            <form onSubmit={handleSubmit}>
                <Input type="text" placeholder="Name" required onChange={onChangeNameHandler} />
                <BirthdayInput months={months} initialMonthIndex={initialMonthIndex} initialDay={initialDay} onChangeHandler={handleChange} />
                <Link href={window.location.pathname + '/add-friend' + queryString}><Button>Continue</Button></Link>
            </form>
        </StyledForm>
    );
};

export default BlogForm;
