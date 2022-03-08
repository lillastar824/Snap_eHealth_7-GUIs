import React, { FC, useState, ChangeEvent, useEffect, useRef } from 'react';

import { Button, RangeInput, Wrapper } from 'ui';

import { TimeMeter } from './components/TimeMeter';
import { INITIAL_MAX_COUNT, MAX_COUNT_LIMIT } from './constants';
import styles from './timer.module.css';

const Timer: FC = () => {
  const [maxCount, setMaxCount] = useState<number>(INITIAL_MAX_COUNT);
  const [currentCount, setCurrentCount] = useState<number>(0);
  const timeoutIdRef = useRef(0);

  const updateMaxCount = (event: ChangeEvent<HTMLInputElement>) => {
    const nextCount = Number(event.target.value);

    if (nextCount !== maxCount) {
      setMaxCount(nextCount);
      if (currentCount > maxCount) {
        setCurrentCount(nextCount + 1);
      }
    }
  };

  useEffect(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    if (currentCount > maxCount) return;

    const timeoutId = setTimeout(() => {
      setCurrentCount((count) => count + 1);
    }, 100);

    timeoutIdRef.current = Number(timeoutId);
  }, [currentCount, maxCount]);

  return (
    <Wrapper title='Timer'>
      <div className={styles.form}>
        <div className={styles.row}>
          <div className={styles.leftColumn}>Elapsed time: </div>

          <TimeMeter
            className={styles.rightColumn}
            maxCount={maxCount}
            value={currentCount}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.leftColumn}>{`${maxCount / 10}s`}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.leftColumn}>Duration: </div>
          <RangeInput
            min={0}
            value={maxCount}
            onChange={updateMaxCount}
            max={MAX_COUNT_LIMIT}
            className={styles.rightColumn}
          />
        </div>

        <Button
          label='Reset timer'
          className={styles.button}
          onClick={() => {
            setCurrentCount(0);
          }}
        />
      </div>
    </Wrapper>
  );
};

export { Timer };
