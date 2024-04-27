'use client'

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type RedirectFallbackProps = {
    fallback: ReactNode;
}

const RedirectFallback = ({ fallback }: RedirectFallbackProps) => {

    const pathname = usePathname();

    const endpoints = pathname.split('/');

    const isHomePage = endpoints.length <= 2;
    const isLoginPage = endpoints[2] + '/' + endpoints[3] === 'auth/login';
    const isSignUpPage = endpoints[2] + '/' + endpoints[3] === 'auth/sign-up';

    if (!(isHomePage || isLoginPage || isSignUpPage)) window.location = '/auth/login' as any;

    return fallback;
}

export default RedirectFallback;