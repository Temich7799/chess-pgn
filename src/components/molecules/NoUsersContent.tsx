'use client'

import { useRouter } from "next/navigation";
import { Button } from "../atoms/Button/Button";

const NoUsersContent = () => {

    const router = useRouter();

    //todo

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <p>На данный момент отсутствуют данные для текущей даты. Будеть первыми!</p>
            <Button onClick={() => router.push('sign-up')}>
                Зарегистироваться
            </Button>
        </div>
    )
}

export default NoUsersContent;