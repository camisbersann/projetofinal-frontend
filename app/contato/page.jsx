'use client'
import React from 'react';
import InputRegisters from '../components/Input/Input';
import { useState } from 'react';
import Buttons from '../components/Button/Button';
import axios from 'axios';
import styles from './page.module.css'; // Certifique-se de ajustar o caminho do arquivo de estilos
import Footer from '../components/footer/Footer';
import { Header } from '../components/header/Header';

export default function Contato() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const enviarContact = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/contact', { email, message });
            setEmail('');
            setMessage('');
        } catch (error) {
            console.error('Error fetching data:', error);
            setMessage('');
        }
    };

    return (
        <>
            <Header />
            <div className={styles.divforms}>
                <h1 className={styles.pageTitle}>Contato</h1>
                <div className={styles.formContainer}>
                    <InputRegisters type={'text'} varName={email} setVarName={setEmail} label={'Email'} className={styles.inputField} />
                    <InputRegisters type={'text'} varName={message} setVarName={setMessage} label={'Mensagem'} className={styles.inputField} />
                    <button titulo={'Enviar'} onClick={enviarContact} className={styles.submitButton}>Enviar</button>
                </div>
            </div>
            <Footer />
        </>
    );
}
