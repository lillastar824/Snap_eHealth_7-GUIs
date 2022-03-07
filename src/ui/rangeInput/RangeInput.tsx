import React, { FC } from 'react';

import { RangeInputProps } from './types';

const RangeInput: FC<RangeInputProps> = ({
  min,
  max,
  value,
  onChange,
  onMouseUp,
  className,
}) => (
  <input
    type='range'
    min={min}
    value={value}
    onChange={onChange}
    onMouseUp={onMouseUp}
    max={max}
    className={className}
  />
);

export { RangeInput };
