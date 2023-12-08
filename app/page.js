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
                <InputRegisters type={"text"} varName={name} setVarName={setName} label={'Nome'} />

                <InputRegisters type={"date"} varName={birthdate} setVarName={setBirthDate} label={'Data de Nascimento'} />

                <InputRegisters type={"text"} varName={password} setVarName={setPassword} label={'Senha'} />

                <InputRegisters type={"number"} varName={money} setVarName={setMoney} label={'Dinheiro'} />

                <InputRegisters type={"number"} varName={cpf} setVarName={setCpf} label={'CPF'} />

                <InputRegisters type={"number"} varName={cep} setVarName={setCep} label={'CEP'} />

                    <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
                        Registrar
                    </button>

                </form>
            </div>
        </>

    )
}