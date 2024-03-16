import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSelector.module.scss'

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = React.useState('ru')

  React.useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage])

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <select onChange={changeLanguage} className={styles.langselector}>
      <option value="ru">Ru</option>
      <option value="en">En</option>
      <option value="de">De</option>
    </select>
  );
};