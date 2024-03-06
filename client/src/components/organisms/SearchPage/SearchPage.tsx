import React from 'react'
import styles from './SearcgPage.module.scss'
import { SearchBar } from '../../molecules/SearchBar/SearchBar'

export const SearchPage = () => {
  return (
    <div className={styles.searchpage}><SearchBar /></div>
  )
}
