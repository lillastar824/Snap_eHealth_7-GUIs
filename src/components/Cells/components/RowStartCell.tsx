import React, { FC } from 'react';

import { CellHeaderProps } from '../types';
import styles from '../Cells.module.css';

const RowStartCell: FC<CellHeaderProps> = ({ label }) => (
  <td className={styles.table__cell_header}>{label}</td>
);

export { RowStartCell };
