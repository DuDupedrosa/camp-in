import React from 'react';
import { useNavigate } from 'react-router-dom';
import AlertError from '../../Helper/AlertError';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import Button from '../form/Button';
import Input from '../form/Input';
import styles from './LoginPasswordReset.module.css';
import { ReactComponent as LockIcon } from '../../assets/lock.svg';

function LoginFormPasswordReset() {
  const { getUserToken } = React.useContext(UserContext);
  const navigate = useNavigate();
  const password = useForm();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [key, setKey] = React.useState(null);
  const [login, setLogin] = React.useState(null);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');
    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (password.validate()) {
      try {
        setLoading(true);
        setError(null);
        const response = fetch(
          'https://dogsapi.origamid.dev/json/api/password/reset',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              login,
              key,
              password: password.value,
            }),
          },
        );
        if (!response.ok) throw new Error(`Error: tente novamente`);
        navigate('/conta');
        getUserToken(login, password.value);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="titleForm">Redefinir senha</h1>
      <p className="helpLogin">Informe a sua nova senha.</p>
      <form onSubmit={handleSubmit} className={styles.passwordCreate}>
        <Input
          type="password"
          label="Nova senha:"
          id="password"
          icon={<LockIcon />}
          placeholder="Digite sua nova senha"
          {...password}
        />
        {password.error && <AlertError>{password.error}</AlertError>}
        {loading ? (
          <Button disabled>Redefinindo...</Button>
        ) : (
          <Button>Redefinir</Button>
        )}
        {error && <AlertError>{error}</AlertError>}
      </form>
    </section>
  );
}

export default LoginFormPasswordReset;
