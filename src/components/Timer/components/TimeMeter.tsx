import React, { FC } from 'react';

import { TimeMeterProps } from '../types';

const TimeMeter: FC<TimeMeterProps> = ({ className, maxCount, value }) => (
  <meter
    className={className}
    min={0}
    max={maxCount || 1}
    value={maxCount ? value : 1}
  />
);

export { TimeMeter };
