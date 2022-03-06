import { ChangeEvent } from 'react';

import { TemperatureTitles } from './constants';

export type TemperatureValue = string | number;
export type ChangeTemperatureValue = (value: TemperatureValue) => void;
export type ConverterFunc = (temp: number) => number;
export type ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;

export type Temperatures = {
  [key in TemperatureTitles]?: {
    title: string;
    converters: {
      [key in TemperatureTitles]?: ConverterFunc;
    };
  };
};

export type ConverterProps = {
  temperatures: Temperatures;
  firstTemperatureName: TemperatureTitles;
  secondTemperatureName: TemperatureTitles;
};

export type TemperatureInputProps = {
  title: string;
  value: string | number;
  disabled: boolean;
  onChange: ChangeHandler;
  error: boolean;
};

export type UseConverterItem = () => [
  TemperatureValue,
  ChangeTemperatureValue,
  boolean,
];
