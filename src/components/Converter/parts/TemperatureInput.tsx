import React, { FC } from 'react';
import classNames from 'classnames';

import { Input } from 'ui';

import { TemperatureInputProps } from '../types';
import styles from '../style.module.css';

const TemperatureInput: FC<TemperatureInputProps> = ({
  title,
  value,
  onChange,
  disabled,
  error,
}) => (
  <div className={styles.item}>
    <div className={styles['item__title']}>{title}</div>
    <Input
      className={classNames(styles['item__input'], {
        [styles['item__input--error']]: error,
      })}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  </div>
);

export default TemperatureInput;
