'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./person.module.css";
import { Header } from "@/app/components/header/Header";
import Link from "next/link";
import InputRegisters from "@/app/components/Input/Input";

export default function UpdatePerson({ params }) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [instagram, setInstagram] = useState("");
    const [position, setPosition] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("")
    const router = useRouter();
    const { id } = params;

    useEffect(() => {
        async function fetchPersonDetails() {
            try {
                const response = await axios.get(`/api/person/${id}`)
                const person = response.data;
                setName(person.name)
                setAge(person.age)
                setEmail(person.email)
                setInstagram(person.instagram)
                setPosition(person.position)
                setDescription(person.description)
                setImage(person.image)
            } catch (error) {
                console.error("Error fetching person details:", error)
            }
        }

        if (id) {
            fetchPersonDetails()
        }

    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/api/person/${id}`, { name, age, email, instagram, position, description, image });
            router.push(`/person/`);
        } catch (error) {
            console.error("Error updating person:", error);
        }

        // console.log(name);
        // console.log(age);
        // console.log(email);
        // console.log(instagram);
        // console.log(position);
        // console.log(description);
    };

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
                <h1 className={styles.mainText}>Atualizar</h1>

                <form onSubmit={handleSubmit}>
                    <InputRegisters type={"text"} varName={name} setVarName={setName} label={'Nome'} />

                    <InputRegisters type={"number"} varName={age} setVarName={setAge} label={'Idade'} />

                    <InputRegisters type={"text"} varName={email} setVarName={setEmail} label={'Email'} />

                    <InputRegisters type={"text"} varName={instagram} setVarName={setInstagram} label={'Instagram'} />

                    <InputRegisters type={"text"} varName={position} setVarName={setPosition} label={'Posição'} />

                    <InputRegisters type={"text"} varName={description} setVarName={setDescription} label={'Descrição'} />

                    <InputRegisters type={"text"} varName={image} setVarName={setImage} label={'Imagem'} />

                    <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
                        Atualizar
                    </button>

                </form>
            </div>
        </>

    )


}