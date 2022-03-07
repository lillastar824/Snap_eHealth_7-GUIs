import React, { FC, useEffect, useState, useCallback } from 'react';

import { Button, Select, Wrapper } from 'ui';

import { DateInput } from './parts/DateInput';
import { FlightTypes, flightTypeOptions } from './constants';
import { validateInput, getTimestamp, createChangeHandler } from './helpers';
import styles from './style.module.css';

const FlightBooker: FC = () => {
  const [flightType, setFlightType] = useState<FlightTypes>(FlightTypes.OneWay);
  const [oneWayValue, setOneWayValue] = useState('');
  const [returnValue, setReturnValue] = useState('');
  const [isOneWayValid, setIsOneWayValid] = useState(true);
  const [isReturnValid, setIsReturnValid] = useState(true);
  const [isValidForm, setIsValidForm] = useState(false);

  const isReturnDisabled = flightType === FlightTypes.OneWay;

  const validateForm = useCallback(() => {
    const inputsInvalid = !isOneWayValid || !isReturnValid;

    if (inputsInvalid) {
      setIsValidForm(false);
      return;
    }

    if (isReturnDisabled) {
      setIsValidForm(true);
      return;
    }

    setIsValidForm(getTimestamp(oneWayValue) <= getTimestamp(returnValue));
  }, [
    isOneWayValid,
    isReturnValid,
    isReturnDisabled,
    oneWayValue,
    returnValue,
  ]);

  useEffect(() => {
    validateForm();
  }, [oneWayValue, returnValue, validateForm]);

  const validateOneWay = validateInput(setIsOneWayValid);
  const validateReturn = validateInput(setIsReturnValid);

  const onChangeOneWay = createChangeHandler(setOneWayValue, validateOneWay);
  const onChangeReturn = createChangeHandler(setReturnValue, validateReturn);

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as FlightTypes;
    setFlightType(value);
  };

  const onSubmit = () => {
    if (flightType === FlightTypes.OneWay) {
      alert(`You have booked a one-way flight for ${oneWayValue}`);

      return;
    }

    alert(
      `You have booked a return flight from ${oneWayValue} to ${returnValue}`,
    );
  };

  return (
    <Wrapper title='Flight Booker'>
      <Select
        id='flightType'
        className="flightType"
        name='type'
        options={flightTypeOptions}
        onSelect={onSelect}
        value={flightType}
      />
      <DateInput
        value={oneWayValue}
        onChange={onChangeOneWay}
        invalid={!isOneWayValid}
      />
      <DateInput
        value={returnValue}
        onChange={onChangeReturn}
        disabled={isReturnDisabled}
        invalid={!isReturnValid}
      />
      <Button
        label='Book'
        disabled={!isValidForm}
        className={styles.button}
        onClick={onSubmit}
      />
    </Wrapper>
  );
};

export { FlightBooker };
