//Imports;
'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./person.module.css";
import { Header } from "@/app/components/header/Header";
import Link from "next/link";
import InputRegisters from "@/app/components/Input/Input";
import Buttons from "@/app/components/Button/Button";
import Footer from "@/app/components/footer/Footer";


//UpdatePerson Function;
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

     // Asynchronous function to fetch person details from server;
    useEffect(() => {
        async function fetchPersonDetails() {
            try {
                const response = await axios.get(`/api/person/${id}`)
                const person = response.data;

                 // Updating states with person details;
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

         // Checking if 'id' exists before calling the fetchClientDetails function;
        if (id) {
            fetchPersonDetails()
        }

    }, [id]);

      // Function called when submitting the form;
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Sending an HTTP PUT request to update person details;
            await axios.put(`/api/person/${id}`, { name, age, email, instagram, position, description, image });

             // Redirecting to 'person' page;
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

            <div className={styles.body}>
                <div className={styles.container}>

                    <div className={styles.actions}>

                 {/* Link to return to 'person' page */}
                <Link href="/person">
                <Buttons titulo={"Voltar para Membros"}/>
                </Link>
            </div>

            <div className={styles.personContainer}>
                <h1 className={styles.mainText}>Atualizar</h1>

                 {/* Form to update customer details */}
                <form onSubmit={handleSubmit}>
                    <InputRegisters type={"text"} varName={name} setVarName={setName} label={'Nome'} />

                    <InputRegisters type={"number"} varName={age} setVarName={setAge} label={'Idade'} />

                    <InputRegisters type={"text"} varName={email} setVarName={setEmail} label={'Email'} />

                    <InputRegisters type={"text"} varName={instagram} setVarName={setInstagram} label={'Instagram'} />

                    <InputRegisters type={"text"} varName={position} setVarName={setPosition} label={'Posição'} />

                    <InputRegisters type={"text"} varName={description} setVarName={setDescription} label={'Descrição'} />

                    <InputRegisters type={"text"} varName={image} setVarName={setImage} label={'Imagem'} />

                    <Buttons type={"submit"} titulo={"Atualizar"} />

                    </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )


}