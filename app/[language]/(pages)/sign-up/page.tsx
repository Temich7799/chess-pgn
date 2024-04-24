import styles from './styles.module.scss';
// import { emailValidator, baseValidator } from '../../../src/utils/validation';
import { Text } from '../../../../src/components/atoms/Text/Text';
// import { useTranslation } from 'react-i18next';
import SignupForm from '@/components/organisms/SignupForm/SignupForm';
import { PageNextProps } from '@/ts/PageNextPropsType';
import { useTranslation } from '../../../i18n';
import useMonths from '@/hooks/useMonths';

export default async function SignUpPage({ params }: PageNextProps) {

  const { language } = params;

  const { t } = await useTranslation(language);
  const months = await useMonths(language);

  const formPlaceholdres = {
    namePlaceholder: t('name'),
    cityPlaceholder: t('city'),
    langPlaceholder: t('language'),
    secondLangPlaceholder: t('foreign'),
    thirdLangPlaceholder: t('another_foreign'),
  }

  return (
    <div className={styles.signup}>
      <Text tag="h1">{t('signup')}</Text>
      <SignupForm months={months} placeholdres={formPlaceholdres} buttonTitle={t('submit')} />
    </div>
  );
}