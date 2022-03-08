import React from 'react';
import classNames from 'classnames';

import { InputProps } from './types';
import style from './Input.module.css';

export const Input: React.FC<InputProps> = ({
  title,
  value,
  onChange,
  className,
  containerClassName,
  onBlur,
  disabled = false,
  autoFocus = false,
}: InputProps) => (
  <div className={classNames(style.input_container, containerClassName)}>
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
