import React from 'react';
import { BirthdayText } from '@/components/molecules/BirthdayText/BirthdayText';
import { PageNextProps } from '@/ts/PageNextPropsType';
import { GetUserResponse } from '@/ts/GetUserResponseType';
import { SearchUsersForm } from '@/components/organisms/SearchUsersForm/SearchUsersForm';
import { useTranslation } from '../../../i18n';
import useMonths from '@/hooks/useMonths';
import UsersTable from '@/components/atoms/Table/UsersTable';
import NoUsersContent from '@/components/molecules/NoUsersContent';
import StyledSearchPage from '@/components/molecules/StyledSearchPage/StyledSearchPage';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default async function SearchUsersPage({ searchParams, params }: PageNextProps) {

  const { language } = params;

  const date = new Date();

  const { day: currentDay = date.getDate(), month: currentMonthIndex = date.getMonth() + 1, city } = searchParams;

  let endpoint = null;

  if (currentMonthIndex && currentDay) endpoint = process.env.NEXT_API_BASE_URL + `getUserData?birthday=${`${currentDay}/${currentMonthIndex}`}`;

  if (city) endpoint += `&city=${city}`;

  const userData: GetUserResponse[] | undefined = endpoint && await fetch(endpoint)
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => {
      console.error(error)
    });

  const { t } = await useTranslation(language);
  const months = await useMonths(language);

  return (
    <StyledSearchPage>
      <SearchUsersForm months={months} title={t('choose')} buttonTitle={t('search_btn')} cityLabel={t('cities')} currentMonth={parseInt(currentMonthIndex as string)} currentCity={city as string} currentDay={parseInt(`${currentDay}`)} />
      {
        userData?.length
          ? <UsersTable data={userData} t={t} />
          : <NoUsersContent />
      }
      <BirthdayText month={currentMonthIndex as string} day={`${currentDay}`} language={language} />
    </StyledSearchPage>
  );
}