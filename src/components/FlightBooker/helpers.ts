import React from 'react';
import { datePattern } from './constants';

export const getTimestamp = (value: string): number =>
  new Date(value).getTime();

export const validateInput =
  (callback: (isValid: boolean) => void) =>
  (value: string): void => {
    if (value === '') {
      callback(true);
      return;
    }

    callback(new RegExp(datePattern).test(value));
  };

export const createChangeHandler =
  (setValue: (value: string) => void, validateValue: (value: string) => void) =>
  (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setValue(value);
    validateValue(value);
  };
