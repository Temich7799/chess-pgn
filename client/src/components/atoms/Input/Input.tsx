import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './Input.module.scss'

export interface IInput
  extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  readonly value?: string;
  readonly label?: string;
  readonly placeholder?: string;
  readonly onChange?: () => void;
  readonly className?: string;
  readonly type: string;
  readonly name?: string;
  readonly maxLength?: number;
  readonly required?: boolean;
  readonly id?: string;
}

export const Input = ({
  label, placeholder, onChange, value, type, name, maxLength, className, required, id
}: IInput) => {
  return (
    <div>
      <label htmlFor={id}>
        {label}
      </label>

      <input
        className={styles.input}
        id={id}
        maxLength={maxLength}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </div>
  )
}
