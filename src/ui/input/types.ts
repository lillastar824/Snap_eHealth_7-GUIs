import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  value?: string | number | undefined;

  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}
