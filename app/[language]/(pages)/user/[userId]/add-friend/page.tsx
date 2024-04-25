// import { emailValidator, baseValidator } from '../../../src/utils/validation';
import { PageNextProps } from '@/ts/PageNextPropsType';
import NewUserFormWrapper from '@/components/molecules/NewUserFormWrapper/NewUserFormWrapper';

export default async function NewFriendPage({ params }: PageNextProps) {

  const { language } = params;

  return (
    <NewUserFormWrapper title="Add a friend" language={language} type="friend" />
  );
}