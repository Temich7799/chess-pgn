// import { emailValidator, baseValidator } from '@/src/utils/validation';
import { PageNextProps } from '@/ts/PageNextPropsType';
import NewUserFormWrapper from '@/components/molecules/NewUserFormWrapper/NewUserFormWrapper';

export default async function NewUserPage({ params }: PageNextProps) {

  const { language } = params;

  return (
    <NewUserFormWrapper title="Sign in" language={language} />
  );
}