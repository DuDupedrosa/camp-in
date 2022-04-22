import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import LoginForm from './LoginForm';
import LoginFormCreate from './LoginFormCreate';
import styles from './Login.module.css';
import LoginPasswordLost from './LoginPasswordLost';
import LoginPasswordReset from './LoginPasswordReset';

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login) return <Navigate to="conta" />;
  return (
    <section className={styles.login}>
      <div className={`animeLeft ${styles.loginForm}`}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="cadastro" element={<LoginFormCreate />} />
          <Route path="perdeu" element={<LoginPasswordLost />} />
          <Route path="redefinir" element={<LoginPasswordReset />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
