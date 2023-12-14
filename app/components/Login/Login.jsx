// Login.jsx
import React from 'react';
import styles from './Login.module.css';
import Image from 'next/image';

const Login = ({ setInputPassword, password, setLogged, passwordInput }) => {
  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <h1 className={styles.login__title}>Login</h1>
        <input
          className={styles.login__input}
          type="password"
          placeholder="Senha"
          onChange={(e) => setInputPassword(e.target.value)}
        />
        <button
          className={styles.login__button}
          onClick={() => {
            if (passwordInput === password) {
              setLogged(true);
            } else {
              alert("Senha incorreta");
            }
          }}
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
