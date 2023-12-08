'use client';
import axios from "axios";
import { useState, useEffect } from "react";
import styles from './page.module.css';
import Link from "next/link";
import { Header } from "./components/header/Header";

export default function Register() {
    const [name, setName] = useState("");
    const [birthdate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [money, setMoney] = useState("");
    const [cpf, setCpf] = useState("");
    const [cep, setCep] = useState("");
    const [client, setClient] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/api/client", { name, birthdate, password, email, money, cpf, cep });
            setName("");
            setBirthDate("");
            setPassword("");
            setMoney("");
            setEmail("");
            setCpf("");
            setCep("");
        } catch (error) {
            console.error("Error fetching data:", error);
        }


    }

    useEffect(() => {
        async function fetchClient() {
            try {
                const response = await axios.get("/api/client");
                setClient(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchClient();
    }, []);

    return (
        <>
            <Header />

            <div className={styles.actions}>
                <Link href="/client/alreadyRegistered">
                    <button className={`${styles.button} ${styles.primaryButton}`}>
                        Registros
                    </button>
                </Link>
            </div>

            <div className={styles.personContainer}>
                <h1 className={styles.mainText}>Cadastro</h1>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="name">
                            Nome:
                        </label>
                        <input className={styles.input} type="text" id="name"
                            value={name} onChange={(e) => setName(e.target.value)} required></input>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="birthdate">
                            Data de Nascimento:
                        </label>
                        <input className={styles.input} type="date" id="birthdate"
                            value={birthdate} onChange={(e) => setBirthDate(e.target.value)} required></input>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">
                            Email:
                        </label>
                        <input className={styles.input} type="text" id="email"
                            value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="password">
                            Senha:
                        </label>
                        <input className={styles.input} type="number" id="password"
                            value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                    </div>


                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="money">
                            Dinheiro:
                        </label>
                        <input className={styles.input} type="number" id="position"
                            value={money} onChange={(e) => setMoney(e.target.value)} required></input>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="cpf">
                            CPF:
                        </label>
                        <input className={styles.input} type="number" id="cpf"
                            value={cpf} onChange={(e) => setCpf(e.target.value)} required></input>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="cep">
                            CEP:
                        </label>
                        <input className={styles.input} type="number" id="cep"
                            value={cep} onChange={(e) => setCep(e.target.value)} required></input>
                    </div>

                    <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
                        Registrar
                    </button>

                </form>
            </div>
        </>

    )
}