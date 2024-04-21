'use client'

//todo server

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { birthdaysRU, birthdaysEN, birthdaysDE } from '../../../lib/json/locales/birthdays'
import { Text } from '../../atoms/Text/Text';
import styles from './BirthdayText.module.scss'

type Birthdays = {
  day: number;
  month: number;
  text: string[]
}

type BirthdayTextProps = {
  month: string;
  day: string;
}

export const BirthdayText: React.FC<BirthdayTextProps> = ({ month, day }) => {

  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [birthdays, setBirthdays] = useState<Birthdays>();

  useEffect(() => {
    lang === 'ru' && setBirthdays(birthdaysRU.find((birthday) => birthday.day === +day && birthday.month === +month));
    lang === 'en' && setBirthdays(birthdaysEN.find((birthday) => birthday.day === +day && birthday.month === +month));
    lang === 'de' && setBirthdays(birthdaysDE.find((birthday) => birthday.day === +day && birthday.month === +month));
  }, [lang, day, month])

  return (
    <div>
      {birthdays && birthdays.text.map((birthday, index) => (
        <Text tag='p' className={styles.text}>{birthday}</Text>
      ))}
    </div>
  )
}
