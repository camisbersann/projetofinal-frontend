'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./register.module.css";
import Link from "next/link";
import { Header } from "@/app/components/header/Header";
import { Button } from "@/app/components/button/Button";
import { Input } from "@/app/components/Input/Input"

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

            <div className={styles.actions}>
                <Link href="/person">
                    <Button className={`${styles.button} ${styles.primaryButton}`}>
                        Voltar para Membros
                    </Button>
                </Link>
            </div>

            <div className={styles.personContainer}>
                <h1 className={styles.mainText}>Cadastrar Membro</h1>

                <form onSubmit={handleSubmit}>

                    <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required label="Nome" />

                    <Input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required label="Idade" />

                    <Input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required label="Email" />

                    <Input type="text" id="instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} required label="Instagram" />

                    <Input type="text" id="position" value={position} onChange={(e) => setPosition(e.target.value)} required label="Posição" />

                    <Input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required label="Descrição" />

                    <Button type="submit" className={`${styles.button} ${styles.submitButton}`}>

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
                            Email:
                        </label>
                        <input className={styles.input} type="text" id="email"
                            value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="instagram">
                            Instagram:
                        </label>
                        <input className={styles.input} type="text" id="instagram"
                            value={instagram} onChange={(e) => setInstagram(e.target.value)} required></input>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="position">
                            Posição:
                        </label>
                        <input className={styles.input} type="text" id="position"
                            value={position} onChange={(e) => setPosition(e.target.value)} required></input>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="description">
                            Descrição:
                        </label>
                        <input className={styles.input} type="text" id="description"
                            value={description} onChange={(e) => setDescription(e.target.value)} required></input>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="image">
                            Imagem:
                        </label>
                        <input className={styles.input} type="text" id="image"
                            value={image} onChange={(e) => setImage(e.target.value)} required></input>
                    </div>

                    <button type="submit" className={`${styles.button} ${styles.submitButton}`}>

                        Enviar formulário
                    </Button>

                </form>
            </div>
        </>

    )
}


