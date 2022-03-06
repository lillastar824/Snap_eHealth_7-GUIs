import React from 'react';
import classNames from 'classnames';

import styles from './Button.module.css';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?(): void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  disabled = false,
  onClick,
  className,
}: ButtonProps) => (
  <button
    onClick={onClick}
    className={classNames(styles.button, className)}
    disabled={disabled}
  >
    {label}
  </button>
);
