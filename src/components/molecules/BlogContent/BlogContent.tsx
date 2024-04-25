'use client'

import { useEffect, useState } from "react";
import BlogForm from "../../organisms/BlogForm/BlogForm";
import { Month } from "@/ts/MonthType";
import calculateDaysUntilBirthday from "@/utils/calculateDaysUntilBirthday";

type BlogContentProps = {
    months: Array<Month>;
    initialMonthIndex: number;
    initialDay: number;
}

const BlogContent: React.FC<BlogContentProps> = ({ months, initialDay, initialMonthIndex }) => {

    const [birthday, setBirthday] = useState<string>('');
    const [daysUntilBirthday, setDaysUntilBirthday] = useState<number>();

    useEffect(() => {
        birthday && setDaysUntilBirthday(calculateDaysUntilBirthday(birthday));
    }, [birthday]);

    return (
        <section>
            <BlogForm onBirthdayChange={setBirthday} months={months} initialDay={initialDay as number} initialMonthIndex={initialMonthIndex as number} />
            {
                daysUntilBirthday && (
                    daysUntilBirthday >= 0 &&
                    <p style={{ textAlign: 'center', margin: '15px auto' }} >
                        {
                            daysUntilBirthday == 0
                                ? 'Birthday today!'
                                : `${daysUntilBirthday} day${daysUntilBirthday === 1 ? '' : 's'} until birthday`
                        }
                    </p>)
            }
        </section >
    )
}

export default BlogContent;