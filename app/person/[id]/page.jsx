'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./person.module.css";
import { Header } from "@/app/components/header/Header";
import Link from "next/link";

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
            await axios.put(`/api/person/${id}`, { name, age, email, instagram, position, description });
            router.push(`/person/`);
        } catch (error) {
            console.error("Error updating person:", error);
        }
        console.log(name);
        console.log(age);
        console.log(email);
        console.log(instagram);
        console.log(position);
        console.log(description);
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
                        Atualizar
                    </button>

                </form>
            </div>
        </>

    )


}