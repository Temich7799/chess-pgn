import React from 'react';
import styles from './styles.module.scss';
import { BirthdayText } from '@/components/molecules/BirthdayText/BirthdayText';
import { PageNextProps } from '@/ts/PageNextPropsType';
import { GetUserResponse } from '@/ts/GetUserResponseType';
import { SearchUsersForm } from '@/components/molecules/SearchUsersForm/SearchUsersForm';
import { useTranslation } from '../../../i18n';
import useMonths from '@/hooks/useMonths';
import UsersTable from '@/components/atoms/Table/UsersTable';
import NoUsersContent from '@/components/molecules/NoUsersContent';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export const SearchUsersPage: React.FC<PageNextProps> = async ({ searchParams, params }) => {

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
    <div className={styles.searchUsersPage}>
      <div className={styles.searchblock}>
        <SearchUsersForm months={months} title={t('choose')} buttonTitle={t('search_btn')} cityLabel={t('cities')} currentMonth={parseInt(currentMonthIndex as string)} currentCity={city as string} currentDay={parseInt(`${currentDay}`)} />
        {
          userData?.length
            ? <UsersTable data={userData} t={t} />
            : <NoUsersContent />
        }
        <BirthdayText month={currentMonthIndex as string} day={`${currentDay}`} language={language} />
      </div>
    </div >
  );
}

export default SearchUsersPage;
