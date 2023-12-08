'use client';
import styles from './AlreadyRegistered.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from '@/app/components/header/Header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [array, setArray] = useState([]);
  const [client, setClient] = useState([]);
  const router = useRouter();

  const update = async (id) => {
    router.push(`/client/${id}`);
  };

  const deletar = async (id) => {
    const url = `/api/client/${id}`;

    try {
      await axios.delete(url);
      setClient(client.filter((client) => client.id !== id));
      setArray(array.filter((array) => array.id !== id));
    } catch (error) {
      console.error("Erro fetching data:", error);
    }
  }

  useEffect(() => {
    async function fetchClient() {
      try {
        const response = await axios.get("/api/client");
        setClient(response.data);
        setArray(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchClient();
  }, []);

  return (
    <>
      <Header />

      <div className={styles.action}>
        <Link href="/">
          <button className={`${styles.button} ${styles.primaryButton}`}>
            Voltar para Cadastro
          </button>
        </Link>
      </div>

      <div className={styles.clientContainer}>
        <h1 className={styles.mainText}>Membros</h1>

        {client.length ? (
          <div className={styles.clientList}>
            {array.map((client) => (
              <div key={client.id} className={styles.clients}>
                <div className={styles.clientInfo}>
                  <p>ID: {client.id}</p>
                  <p>Nome: {client.name}</p>
                  <p>Data de Nascimento: {client.birthdate}</p>
                  <p>Email: {client.email}</p>
                  <p>Senha: {client.password}</p>
                  <p>Dineheiro: {client.money}</p>
                  <p>CPF: {client.cpf}</p>
                  <p>CEP: {client.cep}</p>
                </div>

                <div className={styles.buttons}>
                  <button className={`${styles.button} ${styles.deleteButton}`}
                    onClick={() => deletar(client.id)}> Deletar</button>
                </div>

                <div className={styles.buttons}>
                  <button className={`${styles.button} ${styles.editButton}`}
                    onClick={() => update(client.id)}> Atualizar</button>
                </div>

              </div>

            ))}
          </div>
        ) : (
          <p>{array.message ? array.message : "Carregando..."}</p>
        )
        }
      </div>
    </>
  )
}