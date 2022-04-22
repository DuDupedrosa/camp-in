import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footerBg}>
      <div className={`container ${styles.footer}`}>
        <p>Camp-in&copy; todos os direitos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
