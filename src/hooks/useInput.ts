import React, { useState } from 'react';

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
