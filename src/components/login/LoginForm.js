import React from 'react';
import Input from '../form/Input';
import Button from '../form/Button';
import useForm from '../../Hooks/useForm';
import AlertError from '../../Helper/AlertError';
import { UserContext } from '../../UserContext';
import styles from './LoginForm.module.css';
import { Link } from 'react-router-dom';
import Head from '../Head';
import { ReactComponent as MailICon } from '../../assets/mail.svg';
import { ReactComponent as LockIcon } from '../../assets/lock.svg';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const [saveLogin, setSaveLogin] = React.useState(false);

  const { getUserToken, loading, error } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      await getUserToken(username.value, password.value, saveLogin);
    }
  }

  return (
    <>
      <Head title="Login" description="Faça seu login" />
      <section>
        <h1 className="titleForm">Faça seu login</h1>
        <p className="helpLogin">Entre com as suas informações de cadastro</p>
        <form onSubmit={handleSubmit} className={styles.loginGrid}>
          <Input
            type="text"
            label="Usuário"
            id="username"
            {...username}
            placeholder="Digite seu usuário / e-mail"
            icon={<MailICon />}
          />
          {username.error && <AlertError>{username.error}</AlertError>}
          <Input
            type="password"
            label="Senha"
            id="password"
            {...password}
            placeholder="Digite sua senha"
            icon={<LockIcon />}
          />
          {password.error && <AlertError>{password.error}</AlertError>}
          <div className={styles.optionsLogin}>
            <label className={styles.rememberLoginLabel}>
              <input
                type="checkbox"
                name="save"
                id="save"
                value={saveLogin}
                onChange={() => setSaveLogin(!saveLogin)}
                className={styles.rememberLoginInput}
              />
              Lembre-me
            </label>
            <Link className={styles.loginForget} to="perdeu">
              Esqueci a minha senha
            </Link>
          </div>
          {error && <AlertError>{error}</AlertError>}
          {loading ? (
            <Button disabled>Entrando...</Button>
          ) : (
            <Button>Entrar</Button>
          )}
          <Link className={styles.callActionLoginCreate} to="cadastro">
            Não tem uma conta? <span>Registre-se</span>
          </Link>
        </form>
      </section>
    </>
  );
};

export default LoginForm;
