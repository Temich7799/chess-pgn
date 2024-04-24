'use client'

import BirthdayInput from '@/components/atoms/BirthdayInput/BirthdayInput';
import { Button } from '@/components/atoms/Button/Button';
import { Input } from '@/components/atoms/Input';
import StyledForm from '@/components/molecules/StyledForm/StyledForm';
import { Month } from '@/ts/MonthType';
import { Dispatch, SetStateAction } from 'react';

type BlogFormProps = {
    months: Array<Month>;
    initialMonthIndex: number;
    initialDay: number;
    setBirthday: Dispatch<SetStateAction<string>>;
}

const BlogForm: React.FC<BlogFormProps> = ({ months, initialMonthIndex, initialDay, setBirthday }) => {

    // const [name, setName] = useState<string>('');

    const handleSubmit = (e: any) => {
        e.preventDefault;
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setName(e.target.value);
    };

    const handleBirthdayChange = (value: string | number, key: string) => {
        setBirthday(value as string)
    };

    return (
        <StyledForm>
            <form onSubmit={handleSubmit}>
                <Input type="text" placeholder="Name" onChange={handleNameChange} required />
                <BirthdayInput months={months} initialMonthIndex={initialMonthIndex} initialDay={initialDay} onChangeHandler={handleBirthdayChange} />
                <Button type="submit">Submit</Button>
            </form>
        </StyledForm>
    );
};

export default BlogForm;
