import React, { DetailedHTMLProps, HTMLAttributes, forwardRef, useEffect, useRef, useState } from 'react';
import styles from './Input.module.scss'
import { languages } from '../../../json/languages';
import { useCombinedRef } from '../../../hooks/useCombinedRef';
import { useTranslation } from 'react-i18next';
import { CityRespone } from '../../../api/types';
import classNames from 'classnames';

type Month = {
  name: string;
  num: string;
  countDates: number[];
}

interface InputSelect extends DetailedHTMLProps<HTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  label?: string;
  type: 'language' | 'foreign' | 'another_foreign' | 'cities' | 'month' | 'day',
  name?: string;
  city?: CityRespone[];
  month?: Month[];
  selectedMonth?: string;
  currentMonth?: number;
  currentDate?: number;
}

export const InputSelect = forwardRef<HTMLSelectElement, InputSelect>(({ onChange, label, type, name, city, month, selectedMonth, currentMonth, currentDate, className, defaultValue }, ref): JSX.Element => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [newSelectedMonth, setSelectedMonth] = useState(selectedMonth)
  const inputRef = useRef<HTMLSelectElement>(null);
  const inputRefCombine = useCombinedRef(ref, inputRef);
  const { t } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
    onChange?.(e);
  };

  useEffect(() => {
    setSelectedMonth(selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    if (month) {
      if (currentMonth) {
        setSelectedLanguage(month[`${currentMonth}`].num)
        setSelectedMonth(month[`${currentMonth}`].num);
      }

      if (currentDate) {
        setSelectedLanguage(`${currentDate}`)
      }
    }
  }, [currentMonth, currentDate])

  const inputClasses = classNames(styles.select, {
    [className as string]: className,
  })

  return (
    <div className={styles.inputBlock}>
      <label htmlFor={type}>{label}</label>
      <select ref={inputRefCombine} defaultValue={defaultValue} className={inputClasses} name={name} id={type} value={selectedLanguage} onChange={handleLanguageChange}>
        <option value={""}>{t(type)}</option>
        {type !== 'cities' && type !== 'month' && type !== 'day' && languages.map((language, index) => (
          <option key={language.code} value={language.name}>
            {language.nativeName}
          </option>
        ))}
        {type === 'cities' && city?.map((onecity, index) => (
          <option key={`${index}_${onecity.city}`} value={onecity.city}>
            {onecity.city}
          </option>
        ))}
        {
          type === 'month' && month?.map((onemonth) => (
            <option key={onemonth.name} value={onemonth.num}>
              {onemonth.name}
            </option>
          ))
        }
        {
          type === 'day' && month?.find(month => month.num === newSelectedMonth)?.countDates.map((day, index) => (
            <option key={`${selectedMonth}_${index}`} value={day}>
              {day}
            </option>
          ))
        }
      </select>
    </div>
  );
})