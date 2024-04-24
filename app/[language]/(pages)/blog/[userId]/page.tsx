import { Text } from '@/components/atoms/Text/Text';
import FriendsList from '@/components/molecules/FriendsList/FriendsList';
import StyledSearchPage from '@/components/molecules/StyledSearchPage/StyledSearchPage';
import { Friend } from '@/ts/FriendInterface';
import { PageNextProps } from '@/ts/PageNextPropsType';
import useMonths from '@/hooks/useMonths';
// import { useTranslation } from 'react-i18next';
import BlogContent from '@/components/organisms/BlogContent/BlogContent';

const BlogPage: React.FC<PageNextProps> = async ({ params, searchParams }) => {

    // const { userId } = params;

    const language = 'en'; //todo

    // const { t } = await useTranslation(language);
    const months = await useMonths(language);

    const date = new Date();

    const { day: currentDay = date.getDate(), month: currentMonthIndex = date.getMonth() + 1, city } = searchParams;

    const friends = [{}] as [Friend] //TODO

    return (
        <StyledSearchPage>
            <Text tag='h1'>Add a friend</Text>
            <BlogContent months={months} initialDay={currentDay as number} initialMonthIndex={currentMonthIndex as number} />
            <FriendsList friends={friends} />
        </StyledSearchPage>
    );
};

export default BlogPage;
