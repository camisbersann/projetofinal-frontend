'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./register.module.css";
import Link from "next/link";
import { Header } from "@/app/components/header/Header";

export default function Register() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [instragram, setInstragram] = useState("");
    const [position, setPosition] = useState("");
    const [description, setDescription] = useState("");
    const [person, setPerson] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/api/person", { name, age, email, instragram, position, description });
            setName("");
            setAge("");
            setEmail("");
            setInstragram("");
            setPosition("");
            setDescription("");
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        async function fetchPerson() {
            try {
                const response = await axios.get("/api/person");
                setPerson(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchPerson();
    }, []);

    return (
        <>
            <Header />

            <div className={styles.actions}>
                <Link href="/person">
                    <button className={`${styles.button} ${styles.primaryButton}`}>
                        Voltar para Membros
                    </button>
                </Link>
            </div>

            <div className={styles.personContainer}>
                <h1 className={styles.mainText}>Cadastrar Membro</h1>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="name">
                            Nome:
                        </label>
                        <input className={styles.input} type="text" id="name" 
                        value={name} onChange={(e) => setName(e.target.value)} required></input>
                </div>
                
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="age">
                            Idade:
                        </label>
                        <input className={styles.input} type="number" id="age" 
                        value={age} onChange={(e) => setAge(e.target.value)} required></input>
                </div>
                
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">
                            Idade:
                        </label>
                        <input className={styles.input} type="text" id="email" 
                        value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                </div>

                <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
                    Enviar formulario
                </button>
                    
                </form>
            </div>
        </>

    )
}



