import { cookies } from 'next/headers'
import { ReactNode } from 'react'
import RedirectFallback from './RedirectFallback';

type AuthProviderProps = {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {

    const cookieStore = cookies();

    const isLogged = cookieStore.has('authToken');

    return isLogged ? children : <RedirectFallback fallback={children} />
}

export default AuthProvider;