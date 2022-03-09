export interface SelectProps {
  name: string;
  id: string;
  options: Option[];
  value?: string | number;
  size?: number;
  className?: string;
  containerClassName?: string;
  onSelect?(event: React.ChangeEvent<HTMLSelectElement>): void;
}

export interface Option {
  value: string | number;
  label: string | number;
}
