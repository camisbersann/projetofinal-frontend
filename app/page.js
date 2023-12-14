'use client';
import axios from "axios";
import { useState, useEffect } from "react";
import styles from './page.module.css';
import Link from "next/link";
import { Header } from "./components/header/Header";
import InputRegisters from "@/app/components/Input/Input";
import Buttons from "./components/Button/Button";
import Footer from "./components/footer/Footer";
import Popup from "./components/Popup/Popup";
import PopupMessage from "./components/MensageError/MensageError";


export default function Register() {
    const [name, setName] = useState("");
    const [birthdate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [money, setMoney] = useState("");
    const [cpf, setCpf] = useState("");
    const [cep, setCep] = useState("");
    const [client, setClient] = useState([]);
    const [popupMessage, setPopupMessage] = useState("");
    const [messageStatus, setMessageStatus] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/api/client", { name, birthdate, email, password, money, cpf, cep });
            setName("");
            setBirthDate("");
            setPassword("");
            setMoney("");
            setEmail("");
            setCpf("");
            setCep("");
            setPopupMessage("Cadastro realizado com sucesso!");
            setMessageStatus('success');
            
            setTimeout(() => {
                setPopupMessage("");
                setMessageStatus("");
            }, 3000);
        } catch (error) {
            console.error(error);
            setPopupMessage("Erro ao cadastrar!");
            setMessageStatus('error');
            setTimeout(() => {
                setPopupMessage("");
                setMessageStatus("");
            }, 3000);
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

            <div className={styles.body}>
                <div className={styles.container}>

                    <div className={styles.actions}>
                        <Link href="/client/alreadyRegistered">
                            <Buttons titulo={"Registros"} />
                        </Link>
                    </div>

                    <div className={styles.personContainer}>
                        <h1 className={styles.mainText}>Cadastro</h1>

                        <form onSubmit={handleSubmit}>
                            <InputRegisters type={"text"} varName={name} setVarName={setName} label={'Nome'} />

                            <InputRegisters type={"date"} varName={birthdate} setVarName={setBirthDate} label={'Data de Nascimento'} />

                            <InputRegisters type={"email"} varName={email} setVarName={setEmail} label={'Email'} />

                            <InputRegisters type={"text"} varName={password} setVarName={setPassword} label={'Senha'} />

                            <InputRegisters type={"number"} varName={money} setVarName={setMoney} label={'Dinheiro'} />

                            <InputRegisters type={"number"} varName={cpf} setVarName={setCpf} label={'CPF'} />

                            <InputRegisters type={"number"} varName={cep} setVarName={setCep} label={'CEP'} />

                            <Buttons type={"submit"} titulo={"Registrar"} />
                            </form>
                    </div>
                </div>
                <PopupMessage errorMessage={popupMessage} status={messageStatus}/>
            </div>
            <Footer />
        </>
                )
}