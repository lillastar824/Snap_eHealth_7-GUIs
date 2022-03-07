import React, { FC, useState } from 'react';

import { Wrapper, Button } from 'ui';

import styles from './style.module.css';

const Counter: FC = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <Wrapper title='Counter'>
      <div className={styles.container}>
        <div className={styles.count}>{count}</div>
        <Button label='Count' onClick={increment} className={styles.button} />
      </div>
    </Wrapper>
  );
};

export { Counter };
