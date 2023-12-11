'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./client.module.css";
import { Header } from "@/app/components/header/Header";
import Link from "next/link";
import Buttons from "@/app/components/Button/Button";
import InputRegisters from "@/app/components/Input/Input";
import Footer from "@/app/components/footer/Footer";

export default function UpdateClient({ params }) {
    const [name, setName] = useState("");
    const [birthdate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [money, setMoney] = useState("");
    const [cpf, setCpf] = useState("");
    const [cep, setCep] = useState("");
    const [travels, setTravels] = useState([]);
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
                setTravels(client.travels)
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
            await axios.put(`/api/client/${id}`, { name, birthdate, email, password, money, cpf, cep, travels });
            router.push(`/client/alreadyRegistered`);
        } catch (error) {
            console.error("Error updating client:", error);
        }
    }

    return (
        <>
            <Header />

            <div className={styles.body}>
                <div className={styles.container}>

                    <div className={styles.actions}>
                        <Link href="/client/alreadyRegistered">
                            <Buttons titulo={"Voltar para Clientes"}/>
                        </Link>
                    </div>

                    <div className={styles.clientsContainer}>
                        <h1 className={styles.mainText}>Atualizar</h1>


                        <form onSubmit={handleSubmit}>
                            <InputRegisters type={"text"} varName={name} setVarName={setName} label={'Nome'} />

                            <InputRegisters type={"date"} varName={birthdate} setVarName={setBirthDate} label={'Data de Nascimento'} />

                            <InputRegisters type={"text"} varName={password} setVarName={setPassword} label={'Senha'} />

                            <InputRegisters type={"number"} varName={money} setVarName={setMoney} label={'Dinheiro'} />

                            <InputRegisters type={"number"} varName={cpf} setVarName={setCpf} label={'CPF'} />

                            <InputRegisters type={"number"} varName={cep} setVarName={setCep} label={'CEP'} />

                            <div className={styles.box}>

                            <Buttons type={"submit"} titulo={"Atualizar"} className={styles.button}/>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}