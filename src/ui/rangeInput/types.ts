import { ChangeEvent, MouseEventHandler } from 'react';

export type RangeInputProps = {
  min: number;
  max: number;
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onMouseUp?: MouseEventHandler;
  className?: string;
};
