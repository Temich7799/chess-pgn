import React from 'react';
import { BirthdayText } from '@/components/molecules/BirthdayText/BirthdayText';
import { PageNextProps } from '@/ts/PageNextPropsType';
import { User } from '@/ts/UserType';
import { SearchUsersForm } from '@/components/organisms/SearchUsersForm/SearchUsersForm';
import useMonths from '@/hooks/useMonths';
import UsersTable from '@/components/organisms/UsersTable/UsersTable';
import StyledSearchPage from '@/components/molecules/StyledSearchPage/StyledSearchPage';
import NoUsersWrapper from '@/components/molecules/NoUsersWrapper/NoUsersWrapper';
import NewUserFormInitial from '@/components/organisms/NewUserFormInitial/NewUserFormInitial';
import { useTranslation } from '../../../i18n';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default async function SearchUsersPage({ searchParams, params }: PageNextProps) {

  const { language } = params;

  const date = new Date();

  const { day: currentDay = date.getDate(), month: currentMonthIndex = date.getMonth() + 1, city } = searchParams;

  let endpoint = null;

  if (currentMonthIndex && currentDay) endpoint = process.env.NEXT_API_BASE_URL + `getAllUsers?birthday=${`${currentDay}/${currentMonthIndex}`}`;

  if (city) endpoint += `&city=${city}`;

  const usersData: User[] | undefined = endpoint && await fetch(endpoint)
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => {
      console.error(error)
    });

  const { t } = await useTranslation(language);
  const months = await useMonths(language);

  const cookieStore = cookies();

  const isLogged = cookieStore.has('Auth');

  return (
    <StyledSearchPage>
      <SearchUsersForm months={months} title={t('choose')} buttonTitle={t('search_btn')} cityLabel={t('cities')} currentMonth={currentMonthIndex as number} currentCity={city as string} currentDay={currentDay as number} />
      <NoUsersWrapper usersData={usersData as User[]} actionPath='/auth/login'>
        <UsersTable data={usersData as User[]} t={t} exclude={['month', 'day', 'note']} />
      </NoUsersWrapper>
      <BirthdayText month={currentMonthIndex as string} day={`${currentDay}`} language={language} />
      {!isLogged && usersData?.length && <NewUserFormInitial title="Add a new user" actionPath="/auth/sign-up" months={months} initialMonthIndex={currentMonthIndex as number} initialDay={currentDay as number} />}
    </StyledSearchPage>
  );
}