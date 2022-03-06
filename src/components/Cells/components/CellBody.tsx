import React, { FC } from 'react';

import { Input } from 'ui';
import { useInput, useInputShow } from 'hooks';

import { ReducerTypes, CellBodyProps } from '../types';
import styles from '../Cells.module.css';

const CellBody: FC<CellBodyProps> = ({
  id,
  value,
  renderValue = '',
  dispatch,
}) => {
  const showInput = useInputShow();
  const textInput = useInput(value || '');

  return (
    <td
      className={styles.table__cell}
      onClick={() => {
        showInput.onShow();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          showInput.onHidden();

          dispatch({
            type: ReducerTypes.ADD_OR_UPDATE,
            payload: {
              id,
              value: textInput.value,
            },
          });
        }
      }}
    >
      {showInput.show ? (
        <Input
          {...textInput}
          onBlur={() => {
            showInput.onHidden();

            dispatch({
              type: ReducerTypes.ADD_OR_UPDATE,
              payload: {
                id,
                value: textInput.value,
              },
            });
          }}
          autoFocus
        />
      ) : (
        renderValue
      )}
    </td>
  );
};

export { CellBody };
