'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button/Button';
import { useLanguageContext } from '@/contexts/CurrentLanguageContext';
import StyledForm from '@/components/molecules/StyledForm/StyledForm';
import { useLoginMutation } from '@/lib/redux/api/authApi';
import Link from 'next/link';

type LoginFormProps = {
    buttonTitle: string;
    registerButtonTitle: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ buttonTitle, registerButtonTitle }) => {

    const { language } = useLanguageContext();

    const [formData, setFormData] = useState<{ email: string; password: string }>({ email: '', password: '' });

    const [login, { isLoading, isError, isSuccess }] = useLoginMutation();

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        try {
            const { data } = await login(formData);
            console.log('Login successful', data);
        } catch (error) {
            console.error('Login error:', error);
        }
    }, [formData, login]);

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }, []);

    useEffect(() => {
        if (isSuccess) {
            console.log('Login successful');
        }
    }, [isSuccess]);

    return (
        <StyledForm>
            <form onSubmit={handleSubmit}>
                <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={onChangeHandler} />
                <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={onChangeHandler} />
                <Button type="submit" disabled={isLoading}>{isLoading ? 'Logging in...' : buttonTitle}</Button>
                <Link href="/auth/sign-up"><Button>{registerButtonTitle}</Button></Link>
                {isError && <p >Error: Incorrect email or password</p>}
            </form>
        </StyledForm>
    );
};

export default LoginForm;
