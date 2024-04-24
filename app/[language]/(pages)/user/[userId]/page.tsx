import { Text } from '@/components/atoms/Text/Text';
import StyledSearchPage from '@/components/molecules/StyledSearchPage/StyledSearchPage';
import { PageNextProps } from '@/ts/PageNextPropsType';
import useMonths from '@/hooks/useMonths';
import BlogContent from '@/components/organisms/BlogContent/BlogContent';
import UsersTable from '@/components/organisms/UsersTable/UsersTable';
import { useTranslation } from '../../../../i18n';
import { User } from '@/ts/UserType';
import calculateDaysUntilBirthday from '@/utils/calculateDaysUntilBirthday';
import NoUsersWrapper from '@/components/molecules/NoUsersWrapper/NoUsersWrapper';

const UserPage: React.FC<PageNextProps> = async ({ params, searchParams }) => {

    const { userId } = params;

    const language = 'en'; //todo

    const months = await useMonths(language);

    const date = new Date();

    const { day: currentDay = date.getDate(), month: currentMonthIndex = date.getMonth() + 1, city } = searchParams;

    const friendsData: User[] | undefined = await fetch(process.env.NEXT_API_BASE_URL + 'getAllFriends', { method: 'POST', body: { userId } })
        .then((res) => res.json())
        .then((res) => res)
        .catch((error) => {
            console.error(error)
        });

    const upcomingFriendsData = friendsData?.map((friend) => {

        const days_until = calculateDaysUntilBirthday(`${friend.day}/${friend.month}`);

        if (days_until > 0) {
            return {
                ...friend,
                days_until
            }
        }
    }) as User[];

    const { t } = await useTranslation(language);

    return (
        <StyledSearchPage>
            <Text tag='h1'>Add a friend</Text>
            <BlogContent months={months} initialDay={currentDay as number} initialMonthIndex={currentMonthIndex as number} />
            <section>
                <Text tag='h2'>My friends</Text>
                <NoUsersWrapper usersData={friendsData as User[]}>
                    <UsersTable data={friendsData as User[]} t={t} exclude={['language', 'foreign', 'another_foreign']} />
                </NoUsersWrapper>
                <Text tag='h2'>Upcoming birthdays</Text>
                <NoUsersWrapper usersData={upcomingFriendsData}>
                    <UsersTable data={upcomingFriendsData}
                        t={t}
                        exclude={['language', 'foreign', 'another_foreign']}
                        additionalColumns={[{ Header: t('days_until'), accessor: 'days_until' },]}
                    />
                </NoUsersWrapper>
            </section>
        </StyledSearchPage >
    );
};

export default UserPage;
