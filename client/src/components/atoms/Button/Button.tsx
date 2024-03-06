import React, { ReactNode } from 'react'
import styles from './Button.module.scss'

type Props = {
  children: React.ReactNode;
  onClick?: () => void
}

export const Button: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button className={styles.btn}>{children}</button>
  )
}
