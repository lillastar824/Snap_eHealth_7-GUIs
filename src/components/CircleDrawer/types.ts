import { RefObject, Dispatch, SetStateAction } from 'react';

export enum ReducerTypes {
  ADD = 'ADD',
  RESIZE = 'RESIZE',
  UNDO = 'UNDO',
  REDO = 'REDO',
}

export type ReducerType = keyof typeof ReducerTypes;

export type Circle = {
  id: number;
  position: CirclePosition;
  radius: number;
};

export type Circles = Record<number, Circle>;

export type CircleState = {
  circles: Circles;
  order: number[];
  cache: Circle[];
};

export type CircleAction = {
  type: ReducerType;
  payload?: Record<string, string | number>;
};

export type CircleReducer = (
  state: CircleState,
  action: CircleAction,
) => CircleState;

export type CircleActionHandlers = Record<ReducerType, CircleReducer>;

export type CirclePosition = {
  x: number;
  y: number;
};

export type CircleProps = {
  circle: Circle;
  selectedCircle: Circle | null;
  selectCircle: Dispatch<SetStateAction<Circle | null>>;
  setSelectedCircleRef: Dispatch<
    SetStateAction<RefObject<HTMLDivElement> | null>
  >;
};

export type ResizeModalProps = {
  circle: Circle;
  updateRadius: (id: number, radius: number) => void;
  selectedCircleRef: RefObject<HTMLDivElement>;
};
