import React, { FC } from 'react';

import ConverterComponent from './Converter';
import { TemperatureTitles } from './constants';

export const temperatures = {
  [TemperatureTitles.Celsius]: {
    title: 'Celsius',
    converters: {
      [TemperatureTitles.Fahrenheit]: (temperature: number): number =>
        temperature * (9 / 5) + 32,
    },
  },
  [TemperatureTitles.Fahrenheit]: {
    title: 'Fahrenheit',
    converters: {
      [TemperatureTitles.Celsius]: (temperature: number): number =>
        (temperature - 32) * (5 / 9),
    },
  },
};

const Converter: FC = () => (
  <ConverterComponent
    temperatures={temperatures}
    firstTemperatureName={TemperatureTitles.Celsius}
    secondTemperatureName={TemperatureTitles.Fahrenheit}
  />
);

export { Converter };
