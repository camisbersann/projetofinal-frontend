'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./register.module.css";
import Link from "next/link";

export default function Register() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [instragram, setInstragram] = useState("");
    const [position, setPosition] = useState("");
    const [description, setDescription] = useState("");
    const [person, setPerson] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await axios.post("/api/person", {name, age, email, instragram, position, description});
            setName("");
            setAge("");
            setEmail("");
            setInstragram("");
            setPosition("");
            setDescription("");
        }catch (error){
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        async function fetchPerson() {
            try{
            const response = await axios.get("/api/person");
            setPerson(response.data);
            }catch(error){
                console.error("Error fetching data:", error);
            }
        }
    
        fetchPerson();
    }, []);

    return (
        <div>
            
        </div>
        )
}



