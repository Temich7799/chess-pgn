import React from 'react'
import styles from './SearchBar.module.scss'


import { Text } from '../../atoms/Text/Text'
import { Input, InputDate, InputSelect } from '../../atoms/Input'
import { Button } from '../../atoms/Button/Button'

export const SearchBar = () => {
  return (
    <div className={styles.searchblock}>
      <Text tag="h1">Введите параметры поиска</Text>
      <div className={styles.searchbar}>
        <InputDate />
        <Input type='text' placeholder='city' />
        <Input type='email' placeholder='email' />
        <Button >Search</Button>
      </div>
    </div>
  )
}
