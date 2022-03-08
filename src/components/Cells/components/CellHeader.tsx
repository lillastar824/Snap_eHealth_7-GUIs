import React, { FC } from 'react';
import classNames from 'classnames';

import { CellHeaderProps } from '../types';
import styles from '../Cells.module.css';

const CellHeader: FC<CellHeaderProps> = ({ label }) => (
  <th className={classNames(styles.table__cell_header, styles.table__th)}>
    {label}
  </th>
);

export { CellHeader };
