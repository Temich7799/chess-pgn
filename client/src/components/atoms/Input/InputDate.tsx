import React from 'react'
import styles from './Input.module.scss'

type TInputDate = {
  onChange?: () => void
}

export const InputDate = ({ onChange }: TInputDate) => {
  return (
    <div className={styles.input}>
      <input type='date' />
    </div>
  )
}
