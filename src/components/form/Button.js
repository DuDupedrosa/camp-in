import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, disabled }) => {
  return (
    <button disabled={disabled} className={styles.ButtonSubmit}>
      {children}
    </button>
  );
};

export default Button;
