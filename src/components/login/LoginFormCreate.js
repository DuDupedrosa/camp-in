import React from 'react';
import AlertError from '../../Helper/AlertError';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import Button from '../form/Button';
import Input from '../form/Input';
import Head from '../Head';
import styles from './LoginFormCreate.module.css';
import { ReactComponent as UserIcon } from '../../assets/usuario.svg';
import { ReactComponent as MailIcon } from '../../assets/mail.svg';
import { ReactComponent as LockIcon } from '../../assets/lock.svg';

const LoginFormCreate = () => {
  const { getUserToken } = React.useContext(UserContext);
  const username = useForm();
  const email = useForm('email');
  const password = useForm();
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (username.validate() && email.validate() && password.validate()) {
      try {
        setError(null);
        setLoading(true);
        const response = await fetch(
          'https://dogsapi.origamid.dev/json/api/user',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username.value,
              email: email.value,
              password: password.value,
            }),
          },
        );
        const { message } = await response.json();
        if (!response.ok) throw new Error(`Erro: ${message}`);
        await getUserToken(username.value, password.value);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <Head title="Cadastro" description="Faça seu cadastro" />
      <section className="animeLeft">
        <h1 className="titleForm">Faça seu cadastro:</h1>
        <p className="helpLogin">Se cadastre com seu e-mail e sua senha.</p>
        <form onSubmit={handleSubmit} className={styles.formCreate}>
          <Input
            type="text"
            label="Usuário"
            id="username"
            {...username}
            icon={<UserIcon />}
            placeholder="Digite seu nome"
          />
          {username.error && <AlertError>{username.error}</AlertError>}
          <Input
            type="email"
            label="E-mail"
            id="email"
            {...email}
            icon={<MailIcon />}
            placeholder="Digite seu melhor e-mail"
          />
          {email.error && <AlertError>{email.error}</AlertError>}
          <Input
            type="password"
            label="Senha"
            id="password"
            {...password}
            icon={<LockIcon />}
            placeholder="Digite a sua senha"
          />
          {password.error && <AlertError>{password.error}</AlertError>}
          {error && <AlertError>{error}</AlertError>}
          {loading ? (
            <Button disabled>Cadastrando...</Button>
          ) : (
            <Button>Enviar</Button>
          )}
        </form>
      </section>
    </>
  );
};

export default LoginFormCreate;
