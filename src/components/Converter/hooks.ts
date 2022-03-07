import { useState, useEffect } from 'react';

import { validateNumberInput } from './helpers';
import { TemperatureValue, UseConverterItem } from './types';

export const useConverterItem: UseConverterItem = () => {
  const [value, setValue] = useState<TemperatureValue>('');
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    if (validateNumberInput(value) || value === '') {
      setInputError(false);
      return;
    }

    setInputError(true);
  }, [value]);

  return [value, setValue, inputError];
};
