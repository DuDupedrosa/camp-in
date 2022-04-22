import React from 'react';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className="container">
      <div className={styles.NotFound}>
        <h1>Erro: 404</h1>
        <p>Ops! página não encontrada, tente fazer uma nova busca.</p>
      </div>
    </div>
  );
};

export default NotFound;
