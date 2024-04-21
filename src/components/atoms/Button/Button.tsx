import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export const Button: React.FC<ButtonProps> = ({ children, onClick, className, disabled }) => {
  return (
    <button className={styles.btn}>{children}</button>
  )
}
