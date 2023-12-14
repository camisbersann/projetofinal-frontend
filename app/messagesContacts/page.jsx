'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './page.module.css'; // Certifique-se de ajustar o caminho do arquivo de estilos
import { Header } from '../components/header/Header';
import Footer from '../components/footer/Footer';

export default function MostrarInformacoes() {
    const [informacoes, setInformacoes] = useState([]);

    useEffect(() => {
        // Fazer uma requisição para obter as informações postadas
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/contact');
                setInformacoes(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // O segundo parâmetro vazio garante que useEffect só seja executado uma vez após a montagem

    return (
        <>
            <Header />
            <div className={styles.divInfo}>
                <h1 className={styles.pageTitle}>Informações Postadas</h1>
                <ul className={styles.infoList}>
                    {informacoes.map((info, index) => (
                        <li key={index} className={styles.infoItem}>
                            <div>
                                <img src={'https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg'} width={64} height={64} className={styles.icon}></img>
                                <p className={styles.emailName}>{info.email}</p>
                            </div>
                            <div>
                                <p>{info.message}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </>
    );
}
