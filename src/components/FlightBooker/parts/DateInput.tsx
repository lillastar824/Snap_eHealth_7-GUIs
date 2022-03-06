import React, { FC } from 'react';
import classNames from 'classnames';

import { Input } from 'ui';

import { DateInputProps } from '../types';

import styles from '../style.module.css';

const DateInput: FC<DateInputProps> = ({
  value,
  onChange,
  disabled,
  invalid,
}) => {
  return (
    <Input
      className={classNames(styles['date-input'], {
        [styles['date-input--invalid']]: invalid,
      })}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export { DateInput };
