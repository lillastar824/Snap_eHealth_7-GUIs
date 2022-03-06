import React from 'react';

import ConverterComponent from './Converter';
import { TemperatureTitles } from './constants';

export const temperatures = {
  [TemperatureTitles.Celsius]: {
    title: 'Celsius',
    converters: {
      [TemperatureTitles.Fahrenheit]: (temperature: number) =>
        temperature * (9 / 5) + 32,
    },
  },
  [TemperatureTitles.Fahrenheit]: {
    title: 'Fahrenheit',
    converters: {
      [TemperatureTitles.Celsius]: (temperature: number) =>
        (temperature - 32) * (5 / 9),
    },
  },
};

const Converter = () => (
  <ConverterComponent
    temperatures={temperatures}
    firstTemperatureName={TemperatureTitles.Celsius}
    secondTemperatureName={TemperatureTitles.Fahrenheit}
  />
);

export { Converter };
