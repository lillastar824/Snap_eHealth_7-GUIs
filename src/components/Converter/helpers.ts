import {
  TemperatureValue,
  ConverterFunc,
  ChangeTemperatureValue,
} from './types';

export const validateNumberInput = (value: TemperatureValue): boolean => {
  const stringValue = String(value);

  return String(parseFloat(stringValue)) === stringValue;
};

export const createChangeHandler =
  (
    setValue: ChangeTemperatureValue,
    setConvertedValue: ChangeTemperatureValue,
    converter?: ConverterFunc,
  ) =>
  (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    const isNumber = validateNumberInput(value);

    if (value === '') {
      setValue('');
      setConvertedValue('');
      return;
    }

    setValue(value);

    if (!isNumber) {
      return;
    }

    const convertedValue = converter
      ? Math.round(converter(Number(value)))
      : '';

    setConvertedValue(convertedValue);
  };
