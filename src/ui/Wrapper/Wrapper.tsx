import React, { FC } from 'react';

import { WrapperProps } from './types';
import styles from './style.module.css';

const Wrapper: FC<WrapperProps> = ({ children, title }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles['inner-container']}>{children}</div>
      </div>
    </div>
  );
};

export { Wrapper };
