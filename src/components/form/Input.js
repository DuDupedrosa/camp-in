import React from 'react';
import styles from './Input.module.css';

const Input = ({
  label,
  type,
  id,
  handleChange,
  validate,
  icon,
  placeholder,
}) => {
  return (
    <div className={styles.inputBox}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        onChange={handleChange}
        onBlur={validate}
        className={styles.input}
        placeholder={placeholder}
      />
      <p className={styles.detailInput}>{icon}</p>
    </div>
  );
};

export default Input;
