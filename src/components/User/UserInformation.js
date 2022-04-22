import React from 'react';
import { UserContext } from '../../UserContext';
import Head from '../Head';
import styles from './UserInformation.module.css';

const UserInformation = () => {
  const { data } = React.useContext(UserContext);

  return (
    <>
      <Head title="Conta" description="Seus dados pessoais" />
      <section className={styles.userInformation}>
        <h1
          className={`${styles.userInformationText} ${styles.userInformationTitle}`}
        >
          Nome de usuário: {data && data.username}
        </h1>
        <p className={styles.userInformationText}>
          E-mail: {data && data.email}
        </p>
        <p className={styles.userInformationText}>
          Id do usuário: {data && data.id}
        </p>
      </section>
    </>
  );
};

export default UserInformation;
