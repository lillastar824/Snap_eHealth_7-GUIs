import React from 'react';

import style from './Select.module.css';

export interface Option {
  value: string | number;
  label: string | number;
}

interface SelectProps {
  name: string;
  id: string;
  options: Option[];
  value?: string | number;
  size?: number;

  onSelect?(event: React.ChangeEvent<HTMLSelectElement>): void;
}

export const Select: React.FC<SelectProps> = ({
  name,
  id,
  options,
  onSelect,
  value,
  size,
}: SelectProps) => {
  return (
    <form action='#'>
      <select
        className={style.select}
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
};
