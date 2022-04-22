import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './UserHeader.module.css';
import { ReactComponent as User } from '../../assets/feed.svg';
import { ReactComponent as IconLogout } from '../../assets/sair.svg';
import useMedia from '../../Hooks/useMedia';
import { UserContext } from '../../UserContext';

const UserHeader = () => {
  const { userLogout } = React.useContext(UserContext);

  const [title, setTitle] = React.useState('');
  const menuMobile = useMedia('(max-width: 600px)');
  const [menuActive, setMenuActive] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const { pathname } = location;

    if (pathname === '/conta') setTitle('Conta');
  }, [location]);

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>{title}</h1>
      {menuMobile && (
        <button
          className={styles.mobileMenu}
          onClick={() => setMenuActive(!menuActive)}
        ></button>
      )}
      <nav
        className={`${
          menuMobile ? styles.headerNavResponse : styles.headerNav
        } ${menuActive && styles.headerNavResponseActive}`}
      >
        <NavLink to="/conta">
          <User />
          {menuMobile && <p>Conta</p>}
        </NavLink>
        <button onClick={userLogout}>
          <IconLogout />
          {menuMobile && <p>Sair</p>}
        </button>
      </nav>
    </header>
  );
};

export default UserHeader;
