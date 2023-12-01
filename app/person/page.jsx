'use client'
import Image from 'next/image';
import styles from './AboutUs.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../components/header/Header';
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

    try{
      await axios.delete(url);
      setPerson(person.filter((person) => person.id !== id));
    }catch (error){
      console.error("Erro fetching data:", error);
    }
  }

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

                        <div className={styles.buttons}>
                          <button className={`${styles.button} ${styles.deleteButton}`}
                          onClick={() => deletar(person.id)}> Deletar</button>
                        </div>

                        <div className={styles.buttons}>
                          <button className={`${styles.button} ${styles.editButton}`}
                          onClick={() => update(person.id)}> Atualizar</button>
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
