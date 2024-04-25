import styles from './NewUserFormWrapper.module.scss';
import { Text } from "@/components/atoms/Text/Text";
import { useTranslation } from "../../../../app/i18n";
import useMonths from "@/hooks/useMonths";
import NewUserForm from "@/components/organisms/NewUserForm/NewUserForm";

const NewUserFormWrapper: React.FC<{ title?: string, language: string, type?: 'user' | 'friend', userId?: string }> = async ({ title, language, type, userId }) => {

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
            {title && <Text tag="h1">{title}</Text>}
            <NewUserForm months={months} placeholdres={formPlaceholdres} buttonTitle={t('submit')} type={type} userId={userId} />
        </div>
    )
}

export default NewUserFormWrapper;