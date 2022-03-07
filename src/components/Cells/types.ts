import { Dispatch } from 'react';

export enum ReducerTypes {
  ADD_OR_UPDATE = 'ADD_OR_UPDATE',
}

export type ReducerType = keyof typeof ReducerTypes;

export type CellHeaderProps = { label?: string | number };

export type CellBodyProps = {
  id: string;
  value?: string;
  renderValue?: string;
  dispatch: Dispatch<CellAction>;
};

export type CellValue = {
  id: string;
  value: string;
  renderValue: string;
};

export type CellAction = {
  type: ReducerType;
  payload?: Record<string, string>;
};

export type CellState = Record<string, CellValue>;

export type CellReducer = (state: CellState, action: CellAction) => CellState;

export type CellActionHandlers = Record<ReducerType, CellReducer>;

export type FormulaResolver = (state: CellState, value: string) => string;

export type OperationResolver = (
  state: CellState,
  range: string,
  operation: Operation,
) => string;

export type Operation = (vals: number[]) => number;
