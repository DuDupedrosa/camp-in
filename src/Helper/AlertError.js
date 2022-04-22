import React from 'react';
import styles from './AlertError.module.css';

const AlertError = ({ children }) => {
  return <p className={styles.error}>{children}</p>;
};

export default AlertError;
