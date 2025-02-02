//Imports;
'use client';
import styles from './AlreadyRegistered.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from '@/app/components/header/Header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Buttons from '@/app/components/Button/Button';
import Footer from '@/app/components/footer/Footer';


export default function Home() {

  // States to store customer data;
  const [array, setArray] = useState([]);
  const [client, setClient] = useState([]);
  const router = useRouter();

  // Function to redirect to the client update page;
  const update = async (id) => {
    router.push(`/client/${id}`);
  };

  // Function to delete a customer;
  const deletar = async (id) => {
    const url = `/api/client/${id}`;

    try {
      // Sending an HTTP DELETE request to delete the client;
      await axios.delete(url);

      // Updating state to reflect customer deletion;
      setClient(client.filter((client) => client.id !== id));
      setArray(array.filter((array) => array.id !== id));
    } catch (error) {
      console.error("Erro fetching data:", error);
    }
  }

  // Effect that is executed when the component is mounted;
  useEffect(() => {
    async function fetchClient() {
      try {
        // Getting client data from the server;
        const response = await axios.get("/api/client");

        // Updating states with customer data;
        setClient(response.data);
        setArray(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchClient();
  }, []);

  return (
    <main className={styles.fundo}>
      <Header />


      <div className={styles.clientContainer}>

      <div className={styles.action}>
        {/* Button to return to the registration page */}
        <Link href="/">
          <Buttons titulo={"Voltar para Cadastro"} />
        </Link>
      </div>
      
        <h1 className={styles.mainText}>Clientes</h1>

        {client.length ? (
          <div className={styles.clientList}>
            {array.map((client) => (
              <div key={client.id} className={styles.clients}>
                <div className={styles.clientInfo}>
                  {/* Displaying customer information */}
                  <p> <span className={styles.p}>Nome:</span> {client.name}</p>
                  <p>  <span className={styles.p}> Data de Nascimento</span> : {client.birthdate}</p>
                  <p  ><span className={styles.p}>Email:  </span> {client.email}</p>
                  <p > <span className={styles.p}>Senha:  </span> {client.password}</p>
                  <p > <span className={styles.p}>Dineheiro:  </span> {client.money}</p>
                  <p  ><span className={styles.p}>CPF:  </span> {client.cpf}</p>
                  <p > <span className={styles.p}>CEP:  </span> {client.cep}</p>
                </div>

                <div className={styles.btns}>
                {/* Buttons to delete and edit the client */}
                  <div className={styles.buttons}>
                    <Buttons typeButton={'delete'} functionName={() => deletar(client.id)} titulo={<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 30 30">
                      <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                    </svg>} />
                  </div>

                  <div className={styles.buttons}>
                    <Buttons typeButton={'edit'} functionName={() => update(client.id)} titulo={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                      <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" /></svg>} />
                  </div>

                </div>

                <div>
                  {/* Button to see more customer details */}
                  <Link href={`/principalpage/${client.id}`}>
                    <Buttons titulo={"Ver mais"} />
                  </Link>
                  </div>

              </div>

            ))}
          </div>
        ) : (
          // Displaying loading message;
          <p>{array.message ? array.message : "Carregando..."}</p>
        )
        }
      </div >

      <Footer/>
    </main>
  )
}