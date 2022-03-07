import { ChangeEvent, useState } from 'react';

type InputData = {
  value: string;
  onClear: () => void;
  onChange: ChangeInputHandler;
};

type ChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => void;

export const useInput = (initialValue: string): InputData => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange: ChangeInputHandler = (event) => {
    setValue(event.target.value);
  };

  const onClear = () => {
    setValue(initialValue);
  };

  return {
    value,
    onChange,
    onClear,
  };
};
