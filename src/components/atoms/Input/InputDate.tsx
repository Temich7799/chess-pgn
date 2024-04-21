import React, { DetailedHTMLProps, HTMLAttributes, forwardRef, useRef } from 'react'
import styles from './Input.module.scss'
import { useCombinedRef } from '../../../hooks/useCombinedRef';

interface TInputDate
  extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  readonly value?: string;
  readonly label?: string;
  readonly isError?: boolean;
  readonly placeholder?: string;
  readonly className?: string;
  readonly name?: string;
  readonly maxLength?: number;
  readonly resetField?: () => void;
  readonly resetMask?: () => void;
  readonly handleSearch?: () => void;
  readonly handleCalendar?: () => void;
  readonly white?: boolean;
  readonly required?: boolean;
  readonly id?: string;
  readonly defaultValue?: string;
  readonly wrappDataTestid?: string;
  readonly size?: 'm' | 's' | 'l';
  readonly textAlign?: string;
}

export const InputDate = forwardRef<HTMLInputElement, TInputDate>(
  (
    {
      label,
      isError = false,
      placeholder,
      onBlur,
      onChange,
      onFocus,
      onInput,
      resetField,
      resetMask,
      handleSearch,
      handleCalendar,
      value,
      maxLength,
      className,
      white,
      required,
      id,
      defaultValue,
      wrappDataTestid,
      size = 'm',
      textAlign,
      ...rest
    },
    ref,
  ): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null);
    const inputRefCombine = useCombinedRef(ref, inputRef);

    inputRef.current?.setAttribute("min", "2024-01-01")
    inputRef.current?.setAttribute("max", "2024-12-31")

    return (
      <div className={styles.inputBlock}>
        <label
          htmlFor={id}
        >
          {label}
        </label>
        <input className={className} ref={inputRefCombine} id='' type='date' onChange={onChange} />
      </div>
    )
  })