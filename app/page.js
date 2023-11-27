'use client'
import Image from 'next/image';
import styles from './page.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
    <div>
      {array.map((person) => (
        <div key= {person.id}>
          <p>{person.name}</p>
          <p>{person.description}</p>
          </div>
      ))}
    </div>
  );
}
