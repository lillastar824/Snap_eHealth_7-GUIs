import React, { FC, RefObject, useReducer, useState, useRef } from 'react';

import { Button, Wrapper } from 'ui';

import { initialCircleState } from './initialState';
import { getRandomInt } from './helpers';
import { DEFAULT_RADIUS } from './constants';
import {
  CircleActionHandlers,
  CirclePosition,
  CircleReducer,
  Circles,
  ReducerTypes,
  Circle as CircleType,
} from './types';
import { Circle } from './components/Circle';
import { ResizeModal } from './components/ResizeModal';
import styles from './drawer.module.css';

const ACTION_HANDLERS: CircleActionHandlers = {
  [ReducerTypes.ADD]: (state, { payload }) => {
    if (!payload) {
      return state;
    }

    const { x, y } = payload;

    const id = getRandomInt(999999999);

    const nextCircle = {
      id,
      position: {
        x: Number(x),
        y: Number(y),
      },
      radius: DEFAULT_RADIUS,
    };

    const nextState = {
      ...state,
      circles: {
        ...state.circles,
        [id]: nextCircle,
      },
      order: [...state.order, id],
      cache: [],
    };

    return nextState;
  },
  [ReducerTypes.RESIZE]: (state, { payload }) => {
    if (!payload) {
      return state;
    }

    const { id, radius } = payload;

    const nextCircle = { ...state.circles[Number(id)], radius };

    return {
      ...state,
      circles: {
        ...state.circles,
        [id]: nextCircle,
      },
    };
  },
  [ReducerTypes.UNDO]: (state) => {
    const { order, cache, circles } = state;

    const removedId = order[order.length - 1];
    const nextOrder = order.slice(0, order.length - 1);
    const nextCache = [...cache, circles[order[order.length - 1]]];

    const nextCircles = Object.entries(circles).reduce<Circles>(
      (currentCircles, [entryKey, entryValue]) => {
        if (removedId === Number(entryKey)) {
          return currentCircles;
        }

        currentCircles[Number(entryKey)] = entryValue;

        return currentCircles;
      },
      {},
    );
    return {
      ...state,
      circles: nextCircles,
      order: nextOrder,
      cache: nextCache,
    };
  },
  [ReducerTypes.REDO]: (state) => {
    const { order, cache, circles } = state;

    if (cache.length === 0) {
      return state;
    }

    const cachedCircle = cache[cache.length - 1];

    const nextCache = cache.slice(0, order.length - 1);
    const nextOrder = [...order, cachedCircle.id];
    const nextCircles = {
      ...circles,
      [cachedCircle.id]: cachedCircle,
    };

    return {
      ...state,
      order: nextOrder,
      cache: nextCache,
      circles: nextCircles,
    };
  },
};

const circlesReducer: CircleReducer = (state, action) => {
  return ACTION_HANDLERS[action.type]
    ? ACTION_HANDLERS[action.type](state, action)
    : state;
};

const CircleDrawer: FC = () => {
  const [circlesState, dispatch] = useReducer(
    circlesReducer,
    initialCircleState,
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectedCircleRef, setSelectedCircleRef] =
    useState<RefObject<HTMLDivElement> | null>(null);

  const [selectedCircle, selectCircle] = useState<CircleType | null>(null);

  const addCircle = (position: CirclePosition) => {
    dispatch({
      type: ReducerTypes.ADD,
      payload: position,
    });
  };

  const updateRadius = (id: number, radius: number) => {
    dispatch({
      type: ReducerTypes.RESIZE,
      payload: {
        id,
        radius,
      },
    });
  };

  const undo = () => {
    dispatch({
      type: ReducerTypes.UNDO,
    });
  };

  const redo = () => {
    dispatch({
      type: ReducerTypes.REDO,
    });
  };

  const onAreaClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setSelectedCircleRef(null);
    selectCircle(null);

    const rect = wrapperRef.current?.getBoundingClientRect();

    if (rect) {
      addCircle({
        x: event.pageX - rect.x,
        y: event.pageY - document.documentElement.scrollTop - rect.y,
      });
    }
  };

  return (
    <Wrapper title='Circle drawer'>
      <div className={styles.wrapper}>
        <div className={styles.buttonWrapper}>
          <Button
            label='Undo'
            onClick={undo}
            disabled={circlesState.order.length === 0}
          />
          <Button
            label='Redo'
            onClick={redo}
            disabled={circlesState.cache.length === 0}
          />
        </div>
        <div
          ref={wrapperRef}
          className={styles.circleArea}
          onClick={onAreaClick}
        >
          {Object.values(circlesState.circles).map((circle) => (
            <Circle
              key={circle.id}
              circle={circle}
              setSelectedCircleRef={setSelectedCircleRef}
              selectedCircle={selectedCircle}
              selectCircle={selectCircle}
            />
          ))}
          {selectedCircle && selectedCircleRef && (
            <ResizeModal
              circle={selectedCircle}
              selectedCircleRef={selectedCircleRef}
              updateRadius={updateRadius}
            />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export { CircleDrawer };
