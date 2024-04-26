'use client'

import { ReactNode } from "react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button/Button";

const NoUsersContent: React.FC<{ message?: string }> = ({ message }) => {

    const router = useRouter();

    //todo

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <p>{message ? message : 'There is currently no data available for the current date. Be the first!'}</p>
            <Button onClick={() => router.push('new')}>
                Add
            </Button>
        </div>
    )
}

const NoUsersWrapper: React.FC<{ children: ReactNode, usersData: Array<any>, message?: string }> = ({ children, usersData = [], message }) => {

    return usersData.length
        ? children
        : <NoUsersContent message={message} />
}

export default NoUsersWrapper;