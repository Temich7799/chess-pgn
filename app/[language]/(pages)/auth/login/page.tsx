import LoginForm from '@/components/organisms/LoginForm/LoginForm';
import { PageNextProps } from '@/ts/PageNextPropsType';
import styles from '@/components/molecules/NewUserFormWrapper/NewUserFormWrapper.module.scss'
import { Text } from '@/components/atoms/Text/Text';
// import NewUserFormWrapper from '@/components/molecules/NewUserFormWrapper/NewUserFormWrapper';

export default function LoginPage({ params }: PageNextProps) {

  const { language } = params;

  return (
    <>
      <div className={styles.signup}>
        <Text tag='h1'>Login</Text>
        <LoginForm buttonTitle="Login" registerButtonTitle="Sign up" />
      </div>
    </>
  );
}