import React, { FC } from 'react';

import { Input } from 'ui';
import { useInput, useInputShow } from 'hooks';

import { ReducerTypes, CellBodyProps } from '../types';
import { isNumber } from '../helpers';
import styles from '../Cells.module.css';

const CellBody: FC<CellBodyProps> = ({
  id,
  value,
  renderValue = '',
  dispatch,
}) => {
  const showInput = useInputShow();
  const textInput = useInput(value || '');

  const handleStopEdit = () => {
    showInput.onHidden();

    dispatch({
      type: ReducerTypes.ADD_OR_UPDATE,
      payload: {
        id,
        value: textInput.value,
      },
    });
  };

  const displayValue =
    renderValue !== '' && isNumber(renderValue)
      ? Number(renderValue).toFixed(1)
      : renderValue;

  return (
    <td
      className={styles.table__cell}
      onClick={showInput.onShow}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleStopEdit();
        }
      }}
    >
      {showInput.show ? (
        <Input
          {...textInput}
          onBlur={handleStopEdit}
          className={styles.input}
          autoFocus
        />
      ) : (
        displayValue
      )}
    </td>
  );
};

export { CellBody };
