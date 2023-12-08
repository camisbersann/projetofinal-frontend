'use client'
import Image from 'next/image';
import styles from './AboutUs.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [array, setArray] = useState([]);
  const [person, setPerson] = useState([]);
  const router = useRouter();

  const update = async (id) => {
    router.push(`/person/${id}`);
  };

  const deletar = async (id) => {
    const url = `/api/person/${id}`;

    try {
      await axios.delete(url);
      setPerson(person.filter((person) => person.id !== id));
      setArray(array.filter((person) => person.id !== id));
    } catch (error) {
      console.error("Erro fetching data:", error);
    }
  }

  useEffect(() => {
    async function fetchPerson() {
      try {
        const response = await axios.get("/api/person");
        setPerson(response.data);
        setArray(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchPerson();
  }, []);

  //console.log("AAAAAAAAAAAAA");
  //console.log(array);

  return (
    <>
      <Header />

      <div className={styles.action}>
        <Link href="/person/register">
          <button className={`${styles.button} ${styles.primaryButton}`}>
            Cadastrar Membro
          </button>
        </Link>
      </div>

      <div className={styles.personContainer}>
        <h1 className={styles.mainText}>Membros</h1>

        {person.length ? (
          <div className={styles.personList}>
            {array.map((person) => (
              <div key={person.id} className={styles.persons}>
                <img width={100} height={100} src={person.image} className={styles.perfilPhoto}/>
                <div className={styles.personInfo}>
                  <h2>{person.name}</h2>
                  <h4>{person.position}</h4>
                  <div>
                    <p>{person.description}</p>
                  </div>
                </div>
                <div className={styles.buttonsDiv}>
                  <div className={styles.buttons}>
                    <button className={`${styles.button} ${styles.deleteButton}`}
                      onClick={() => deletar(person.id)}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 30 30">
                        <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                      </svg></button>
                  </div>
                  <div className={styles.buttons}>
                    <Link target='_blank' href={`https://www.instagram.com/${person.instagram}`} className={`${styles.button} ${styles.instaButton}`}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg></Link>
                  </div>
                  <div className={styles.buttons}>
                    <button className={`${styles.button} ${styles.editButton}`}
                      onClick={() => update(person.id)}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" /></svg></button>
                  </div>
                </div>
              </div>

            ))}
          </div>
        ) : (
          <p>{array.message ? array.message : "Carregando..."}</p>
        )
        }
      </div>
      <Footer/>
    </>
  )
}
