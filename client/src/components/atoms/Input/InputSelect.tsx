import React, { DetailedHTMLProps, HTMLAttributes, forwardRef, useRef, useState } from 'react';
import styles from './Input.module.scss'
import { languages } from '../../../json/languages';
import { useCombinedRef } from '../../../hooks/useCombinedRef';
import { useTranslation } from 'react-i18next';

interface InputSelect extends DetailedHTMLProps<HTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  label?: string;
  type: 'native' | 'foreign' | 'another_foreign',
  name?: string
}

export const InputSelect = forwardRef<HTMLSelectElement, InputSelect>(({ onChange, label, type, name }, ref): JSX.Element => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const inputRef = useRef<HTMLSelectElement>(null);
  const inputRefCombine = useCombinedRef(ref, inputRef);
  const { t, i18n } = useTranslation();
  const [tag, setTag] = React.useState('')

  React.useEffect(() => {
    if (type === 'native') {
      setTag('language')
    } else if (type === 'foreign') {
      setTag('foreign')
    } else {
      setTag('another_foreign')
    }
  }, [i18n.language])

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
    onChange?.(e);
  };

  return (
    <div >
      <label htmlFor={type}>{label}</label>
      <select ref={inputRefCombine} className={styles.select} name={name} id={type} value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="">{t(tag)}</option>
        {languages.map((language, index) => (
          <option key={language.code} value={language.name}>
            {language.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
})