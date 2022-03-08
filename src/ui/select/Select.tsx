import React from 'react';
import classNames from 'classnames';

import { SelectProps } from './types';
import style from './Select.module.css';

export const Select: React.FC<SelectProps> = ({
  name,
  id,
  options,
  onSelect,
  value,
  size,
  className,
  containerClassName,
}) => (
  <form action='#' className={containerClassName}>
    <select
      className={classNames(style.select, className)}
      name={name}
      id={id}
      size={size}
      onChange={onSelect}
      value={value}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </form>
);
