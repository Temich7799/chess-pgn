'use client'

import { ReactNode } from "react";

type RedirectFallbackProps = {
    fallback: ReactNode;
}

const RedirectFallback = ({ fallback }: RedirectFallbackProps) => {
    const endpoints = window.location.pathname.split('/');
    if (endpoints[2] + '/' + endpoints[3] !== 'auth/login') window.location = '/auth/login' as any;
    return fallback;
}

export default RedirectFallback;