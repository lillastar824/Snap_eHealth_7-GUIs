import React, { useReducer } from 'react';

import { Wrapper } from 'ui';

import { CellBody } from './components/CellBody';
import { CellHeader } from './components/CellHeader';
import { letters, numbers } from './contants';
import { initialState } from './initialState';
import {
  CellActionHandlers,
  ReducerTypes,
  CellReducer,
  CellState,
} from './types';
import { getIdFromParts, operateValue } from './helpers';
import styles from './Cells.module.css';

const ACTION_HANDLERS: CellActionHandlers = {
  [ReducerTypes.ADD_OR_UPDATE]: (state, { payload }) => {
    if (!payload) {
      return state;
    }

    const { value, id } = payload;
    const renderValue = value.includes('=')
      ? operateValue(state, value)
      : value;

    const updatedCellData = { id, value, renderValue };

    const nextState = Object.entries(state).reduce<CellState>(
      (currentState, [entryKey, entryValue]) => {
        if (entryKey === id) {
          currentState[entryKey] = updatedCellData;

          return currentState;
        }

        const nextValue = { ...entryValue };
        currentState[entryKey] = nextValue;

        return currentState;
      },
      {},
    );

    if (!nextState[id]) {
      nextState[id] = updatedCellData;
    }

    return nextState;
  },
};

const cellReducer: CellReducer = (state, action) => {
  return ACTION_HANDLERS[action.type]
    ? ACTION_HANDLERS[action.type](state, action)
    : state;
};

export const Cells: React.FC = () => {
  const [cells, dispatch] = useReducer(cellReducer, initialState);

  return (
    <Wrapper title='Cells'>
      <div className={styles.cells__container}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <CellHeader />
              {letters.map((letter) => (
                <CellHeader key={letter} label={letter} />
              ))}
            </tr>
            {numbers.map((number) => (
              <tr key={number}>
                <CellHeader label={number} />
                {letters.map((letter) => {
                  const id = getIdFromParts(letter, String(number));

                  const values = cells[id] || null;

                  if (values) {
                    return (
                      <CellBody key={id} dispatch={dispatch} {...values} />
                    );
                  }

                  return (
                    <CellBody key={`_${id}`} id={id} dispatch={dispatch} />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};
