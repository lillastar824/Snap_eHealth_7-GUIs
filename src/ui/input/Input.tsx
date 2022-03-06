import React from 'react';
import classNames from 'classnames';

import style from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  disabled?: boolean;
  className?: string;
  value?: string | number | undefined;

  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}

export const Input: React.FC<InputProps> = ({
  title,
  value,
  onChange,
  className,
  onBlur,
  disabled = false,
  autoFocus = false,
}: InputProps) => (
  <div className={style.input_container}>
    {title && <div className={style.input_title}>{title}</div>}
    <input
      className={classNames(style.input, className)}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      autoFocus={autoFocus}
    />
  </div>
);
