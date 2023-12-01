'use client'
import Image from 'next/image';
import styles from './AboutUs.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../components/header/Header';
import Link from 'next/link';

export default function Home() {
  const [array, setArray] = useState([]);
  const [person, setPerson] = useState([]);

  useEffect(() => {
    async function fetchPerson() {
      try{
        const response = await axios.get("/api/person");
        setPerson(response.data);
        setArray(response.data);
      } catch (error){
        console.error("Error fetching data:", error);
      }
    }

    fetchPerson();
  }, []);

  console.log("AAAAAAAAAAAAA");
  console.log(array);

  return (
    <>
     <Header/>

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
                {array.map((person) =>(
                    <div key={person.id} className={styles.persons}>
                        <div className={styles.personInfo}>
                            <p>ID: {person.id}</p>
                            <p>Nome: {person.name}</p>
                            <p>Idade: {person.age}</p>
                            <p>Instagram: {person.instagram}</p>
                            <p>Posição: {person.position}</p>
                            <p>Descrição: {person.description}</p>
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
