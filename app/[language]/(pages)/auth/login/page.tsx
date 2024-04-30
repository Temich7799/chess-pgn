import LoginForm from '@/components/organisms/LoginForm/LoginForm';
import { PageNextProps } from '@/ts/PageNextPropsType';
import styles from '@/components/molecules/NewUserFormWrapper/NewUserFormWrapper.module.scss'
import { Text } from '@/components/atoms/Text/Text';
import { useTranslation } from '../../../../i18n';

export default async function LoginPage({ params }: PageNextProps) {

  const { language } = params;

  const { t } = await useTranslation(language);

  return (
    <>
      <div className={styles.signup}>
        <Text tag='h1'>Login</Text>
        <LoginForm buttonTitle="Login" placeholders={{ passwordPlaceholder: t('password_holder') }} registerButtonTitle={t('sign-up')} />
      </div>
    </>
  );
}