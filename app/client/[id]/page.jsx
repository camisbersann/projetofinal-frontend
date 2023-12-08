'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./client.module.css";
import { Header } from "@/app/components/header/Header";
import Link from "next/link";

export default function UpdateClient({ params }) {
    const [name, setName] = useState("");
    const [birthdate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [money, setMoney] = useState("");
    const [cpf, setCpf] = useState("");
    const [cep, setCep] = useState("");
    const router = useRouter();
    const { id } = params;

    useEffect(() => {
        async function fetchClientDetails() {
            try {
                const response = await axios.get(`/api/client/${id}`)
                const client = response.data;
                setName(client.name)
                setBirthDate(client.birthdate)
                setEmail(client.email)
                setPassword(client.password)
                setMoney(client.money)
                setCpf(client.cpf)
                setCep(client.cep)
            } catch (error) {
                console.error("Error fetching client details:", error)
            }
        }

        if (id) {
            fetchClientDetails()
        }

    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/api/client/${id}`, { name, birthdate, email, password, money, cpf, cep });
            router.push(`/client/alreadyRegistered`);
        } catch (error) {
            console.error("Error updating client:", error);
        }
    }

        return (
            <>
                <Header />

                <div className={styles.actions}>
                    <Link href="/client/alreadyRegistered">
                        <button className={`${styles.button} ${styles.primaryButton}`}>
                            Voltar para Clientes
                        </button>
                    </Link>
                </div>

                <div className={styles.clientsContainer}>
                    <h1 className={styles.mainText}>Atualizar</h1>


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
                            <input className={styles.input} type="number" id="money"
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
                            Atualizar
                        </button>

                    </form>
                </div>
            </>

        )
}