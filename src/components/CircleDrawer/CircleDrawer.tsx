import React, { FC, useReducer, useRef } from 'react';

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
} from './types';
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
    const nextCache = [...cache, order[order.length - 1]];
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
    return { ...state };
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
    const rect = divRef.current?.getBoundingClientRect();

    if (rect) {
      addCircle({
        x: event.pageX - rect.x,
        y: event.pageY - document.documentElement.scrollTop - rect.y,
      });
    }
  };

  const divRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper title='Circle drawer'>
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
      <div ref={divRef} className={styles.circleArea} onClick={onAreaClick}>
        {Object.values(circlesState.circles).map((circle) => (
          <div
            key={circle.id}
            className={styles.circle}
            style={{
              left: circle.position.x - circle.radius / 2,
              top: circle.position.y - circle.radius / 2,
            }}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export { CircleDrawer };
