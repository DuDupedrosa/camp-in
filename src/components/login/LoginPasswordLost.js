import React from 'react';
import AlertError from '../../Helper/AlertError';
import useForm from '../../Hooks/useForm';
import Button from '../form/Button';
import Input from '../form/Input';
import Head from '../Head';
import styles from './LoginPasswordLost.module.css';
import { ReactComponent as MailIcon } from '../../assets/mail.svg';

const LoginFormPasswordLost = () => {
  const login = useForm('email');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [message, setMessage] = React.useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (login.validate()) {
      try {
        setError(null);
        setLoading(true);
        setMessage(null);
        const response = await fetch(
          'https://dogsapi.origamid.dev/json/api/password/lost',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              login: login.value,
              url: window.location.href.replace('perdeu', 'redefinir'),
            }),
          },
        );
        if (!response.ok) throw new Error(`Error: usuário inexistente`);
        setMessage(
          `Email enviado com sucesso, acesse seu e-mail, para redefinir a sua senha.`,
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <Head title="Redefinir" description="Recupere sua senha" />
      <section className="animeLeft">
        {message ? (
          <p className={styles.passwordLostOk}>{message}</p>
        ) : (
          <>
            <h1 className="titleForm">Redefinir senha:</h1>
            <p className="helpLogin">
              Preencha com seu e-mail para redefinir a sua senha.
            </p>
            <form onSubmit={handleSubmit} className={styles.passwordLost}>
              <Input
                type="text"
                label="Seu E-mail"
                id="login"
                {...login}
                icon={<MailIcon />}
                placeholder="Digite seu e-mail"
              />
              {login.error && <AlertError>{login.error}</AlertError>}
              {loading ? (
                <Button disabled>Enviando...</Button>
              ) : (
                <Button>Enviar</Button>
              )}
              {error && <AlertError>{error}</AlertError>}
            </form>
          </>
        )}
      </section>
    </>
  );
};

export default LoginFormPasswordLost;
