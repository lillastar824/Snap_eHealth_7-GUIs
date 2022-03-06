import { ChangeEvent } from 'react';

export type RangeInputProps = {
  min: number;
  max: number;
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};
