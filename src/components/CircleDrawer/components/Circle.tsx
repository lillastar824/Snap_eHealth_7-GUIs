import React, { FC, useRef } from 'react';

import { CircleProps } from '../types';

import styles from '../drawer.module.css';

const Circle: FC<CircleProps> = ({
  circle,
  selectedCircle,
  selectCircle,
  setSelectedCircleRef,
}) => {
  const circleRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={circleRef}
      key={circle.id}
      className={styles.circle}
      style={{
        left: circle.position.x - circle.radius / 2,
        top: circle.position.y - circle.radius / 2,
        width: circle.radius,
        height: circle.radius,
      }}
      onClick={(e) => {
        e.stopPropagation();

        setSelectedCircleRef(circleRef);
        if (!selectedCircle) {
          selectCircle(circle);
          return;
        }

        if (selectedCircle.id === circle.id) {
          selectCircle(null);
        }
      }}
    />
  );
};

export { Circle };
