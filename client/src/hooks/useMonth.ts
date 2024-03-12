import { useTranslation } from 'react-i18next';

export const useMonth = () => {
  const { t } = useTranslation();

  const month = [
    {
      name: t('jan'),
      num: '01',
      countDates: Array.from({ length: 31 }, (_, i) => i + 1),
    },
    {
      name: t('feb'),
      num: '02',
      countDates: Array.from({ length: 29 }, (_, i) => i + 1),
    },
    {
      name: t('mar'),
      num: '03',
      countDates: Array.from({ length: 31 }, (_, i) => i + 1),
    },
    {
      name: t('apr'),
      num: '04',
      countDates: Array.from({ length: 30 }, (_, i) => i + 1),
    },
    {
      name: t('may'),
      num: '05',
      countDates: Array.from({ length: 31 }, (_, i) => i + 1),
    },
    {
      name: t('jun'),
      num: '06',
      countDates: Array.from({ length: 30 }, (_, i) => i + 1),
    },
    {
      name: t('jul'),
      num: '07',
      countDates: Array.from({ length: 31 }, (_, i) => i + 1),
    },
    {
      name: t('aug'),
      num: '08',
      countDates: Array.from({ length: 31 }, (_, i) => i + 1),
    },
    {
      name: t('sep'),
      num: '09',
      countDates: Array.from({ length: 30 }, (_, i) => i + 1),
    },
    {
      name: t('oct'),
      num: '10',
      countDates: Array.from({ length: 31 }, (_, i) => i + 1),
    },
    {
      name: t('nov'),
      num: '11',
      countDates: Array.from({ length: 30 }, (_, i) => i + 1),
    },
    {
      name: t('dec'),
      num: '12',
      countDates: Array.from({ length: 31 }, (_, i) => i + 1),
    },
  ];

  return { month };
};
