import React from 'react';
import { datePattern } from './constants';

export const getTimestamp = (value: string) => new Date(value).getTime();

export const validateInput =
  (callback: (isValid: boolean) => void) => (value: string) => {
    if (value === '') {
      callback(true);
      return;
    }

    callback(new RegExp(datePattern).test(value));
  };

export const createChangeHandler =
  (setValue: (value: string) => void, validateValue: (value: string) => void) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    validateValue(value);
  };
