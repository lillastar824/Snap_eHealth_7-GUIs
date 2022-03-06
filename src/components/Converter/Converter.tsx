import React, { FC } from 'react';

import { Wrapper } from 'ui';

import TemperatureInput from './parts/TemperatureInput';
import { useConverterItem } from './hooks';
import { createChangeHandler } from './helpers';
import { ConverterProps } from './types';
import styles from './style.module.css';

const Converter: FC<ConverterProps> = ({
  temperatures,
  firstTemperatureName,
  secondTemperatureName,
}) => {
  const [firstValue, setFirstValue, firstInputError] = useConverterItem();
  const [secondValue, setSecondValue, secondInputError] = useConverterItem();

  const first = temperatures[firstTemperatureName];
  const second = temperatures[secondTemperatureName];

  const firstConverter = first?.converters[secondTemperatureName];
  const secondConverter = second?.converters[firstTemperatureName];

  const firstDisabled = !firstConverter;
  const secondDisabled = !secondConverter;

  const onChangeFirst = createChangeHandler(
    setFirstValue,
    setSecondValue,
    firstConverter,
  );

  const onChangeSecond = createChangeHandler(
    setSecondValue,
    setFirstValue,
    secondConverter,
  );

  if (!(first && second)) {
    return (
      <div className={styles.wrapper}>
        {firstTemperatureName} or {secondTemperatureName} is not defined
      </div>
    );
  }

  return (
    <Wrapper title='TempConv'>
      <div className={styles.container}>
        <TemperatureInput
          value={firstValue}
          title={first.title}
          disabled={firstDisabled}
          onChange={onChangeFirst}
          error={firstInputError}
        />
        <div className={styles.separator}>=</div>
        <TemperatureInput
          value={secondValue}
          title={second.title}
          disabled={secondDisabled}
          onChange={onChangeSecond}
          error={secondInputError}
        />
      </div>
    </Wrapper>
  );
};

export default Converter;
