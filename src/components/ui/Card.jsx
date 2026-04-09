'use client';

import React from 'react';
import styles from './Card.module.css';

const Card = ({
  children,
  className = '',
  glass = false,
  padding = '24px',
  ...props
}) => {
  return (
    <div
      className={`${styles.card} ${glass ? styles.glass : ''} ${className}`}
      style={{ padding }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
