import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const navigate = useNavigate();
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [login, setLogin] = React.useState(false);

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/login');
    },
    [navigate],
  );

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const response = await fetch(
            'https://dogsapi.origamid.dev/json/jwt-auth/v1/token/validate',
            {
              method: 'POST',
              headers: {
                Authorization: 'Bearer' + token,
              },
            },
          );
          if (!response.ok)
            throw new Error(`Error: token inválido faça o login novamente`);
          await getUserInformation(token);
        } catch (err) {
          setError(err.message);
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    autoLogin();
  }, [userLogout]);

  async function getUserInformation(token) {
    const response = await fetch('https://dogsapi.origamid.dev/json/api/user', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer' + token,
      },
    });
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function getUserToken(username, password, saveLogin) {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(
        'https://dogsapi.origamid.dev/json/jwt-auth/v1/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        },
      );
      if (!response.ok) throw new Error(`Error: usuário não encontrado`);
      const { token } = await response.json();
      await getUserInformation(token);
      navigate('/conta');
      if (saveLogin) window.localStorage.setItem('token', token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  getUserToken.defaultProps = {
    username: '',
    password: '',
    saveLogin: false,
  };

  getUserToken.proTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    saveLogin: PropTypes.bool,
  };

  return (
    <UserContext.Provider
      value={{ getUserToken, userLogout, data, error, login, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
