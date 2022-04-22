import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { UserContext } from '../UserContext';
import styles from './Header.module.css';
import { ReactComponent as User } from '../assets/usuario.svg';

const Header = () => {
  const { login, data } = React.useContext(UserContext);

  return (
    <header className={styles.headerBg}>
      <div className={styles.header}>
        <Link to="/">
          <Logo />
        </Link>
        <nav className={styles.headerLinks}>
          {login ? (
            <>
              <Link to="/conta">{data.username}</Link>
            </>
          ) : (
            <Link to="/login">login / cadastro</Link>
          )}
          <User className={styles.user} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
