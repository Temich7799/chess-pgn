import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { birthdaysRU, birthdaysEN, birthdaysDE } from '../../../json'
import { Text } from '../../atoms/Text/Text';
import styles from './BirthdayText.module.scss'

type Birthdays = {
  day: number;
  month: number;
  text: string[]
}

export const BirthdayText = ({ day, month }: { day: number, month: string }) => {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const [birthdays, setBirthdays] = useState<Birthdays>()

  useEffect(() => {
    console.log(lang === 'ru')
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
