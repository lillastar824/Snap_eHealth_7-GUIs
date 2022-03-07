import React, { FC, ChangeEvent, MouseEventHandler } from 'react';

import { RangeInput } from 'ui';

import { ResizeModalProps } from '../types';
import styles from '../drawer.module.css';

const ResizeModal: FC<ResizeModalProps> = ({
  circle,
  updateRadius,
  selectedCircleRef,
}) => {
  const resizeCircle = (event: ChangeEvent<HTMLInputElement>) => {
    const nextRadius = Number(event.target.value);

    if (selectedCircleRef.current) {
      selectedCircleRef.current.style.width = `${nextRadius}px`;
      selectedCircleRef.current.style.height = `${nextRadius}px`;
    }
  };

  const persistRadiusInState: MouseEventHandler = (e) => {
    e.stopPropagation();

    if (selectedCircleRef.current) {
      const nextRadius = Number(
        selectedCircleRef.current.style.width.replace('px', ''),
      );

      updateRadius(circle.id, nextRadius);
    }
  };

  return (
    <div
      className={styles.modal}
      style={{
        left: circle.position.x - circle.radius,
        top: circle.position.y + circle.radius / 2 + 5,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div>
        Adjust diameter of circle at ({circle.position.x}, {circle.position.y})
      </div>
      {selectedCircleRef && selectedCircleRef.current && (
        <RangeInput
          min={20}
          value={Number(
            selectedCircleRef.current.style.width.replace('px', ''),
          )}
          max={100}
          onChange={resizeCircle}
          onMouseUp={persistRadiusInState}
          className={styles.rangeInput}
        />
      )}
    </div>
  );
};

export { ResizeModal };
