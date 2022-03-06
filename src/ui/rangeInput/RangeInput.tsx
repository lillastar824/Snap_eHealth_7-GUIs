import React, { FC } from 'react';

import { RangeInputProps } from './types';

const RangeInput: FC<RangeInputProps> = ({
  min,
  max,
  value,
  onChange,
  className,
}) => (
  <input
    type='range'
    min={min}
    value={value}
    onChange={onChange}
    max={max}
    className={className}
  />
);

export { RangeInput };
