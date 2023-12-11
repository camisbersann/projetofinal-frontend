'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./register.module.css";
import Link from "next/link";
import { Header } from "@/app/components/header/Header";
import InputRegisters from "@/app/components/Input/Input";
import Buttons from "@/app/components/Button/Button";
import Footer from "@/app/components/footer/Footer";


export default function Register() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [instagram, setInstagram] = useState("");
    const [position, setPosition] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [person, setPerson] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/api/person", { name, age, email, instagram, position, description, image });
            setName("");
            setAge("");
            setEmail("");
            setInstagram("");
            setPosition("");
            setDescription("");
            setImage("");
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
            <div className={styles.body}>
                
                <div className={styles.container}>

                    <div className={styles.actions}>
                        <Link href="/person">
                            <Buttons titulo={"Voltar para Membros"} />
                        </Link>
                    </div>

                    <div className={styles.personContainer}>
                        <h1 className={styles.mainText}>Cadastrar Membro</h1>

                        <form onSubmit={handleSubmit}>
                            <InputRegisters type={"text"} varName={name} setVarName={setName} label={'Nome'} />

                            <InputRegisters type={"number"} varName={age} setVarName={setAge} label={'Idade'} />

                            <InputRegisters type={"text"} varName={email} setVarName={setEmail} label={'Email'} />

                            <InputRegisters type={"text"} varName={instagram} setVarName={setInstagram} label={'Instagram'} />

                            <InputRegisters type={"text"} varName={position} setVarName={setPosition} label={'Posição'} />

                            <InputRegisters type={"text"} varName={description} setVarName={setDescription} label={'Descrição'} />

                            <InputRegisters type={"text"} varName={image} setVarName={setImage} label={'Imagem'} />

                            <Buttons type={"submit"} titulo={"Enviar formulário"} />

                        </form>
                    </div>
                </div>
               
            </div>
 <Footer />
        </>

    )
}