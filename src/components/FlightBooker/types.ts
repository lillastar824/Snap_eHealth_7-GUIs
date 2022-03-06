import React from 'react';

export type DateInputProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  invalid?: boolean;
};
