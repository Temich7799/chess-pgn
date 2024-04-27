import { PageNextProps } from '@/ts/PageNextPropsType';
import NewUserFormWrapper from '@/components/molecules/NewUserFormWrapper/NewUserFormWrapper';

export default function SignUpPage({ params }: PageNextProps) {

  const { language } = params;

  return (
    <NewUserFormWrapper title="Sign up" language={language} />
  );
}