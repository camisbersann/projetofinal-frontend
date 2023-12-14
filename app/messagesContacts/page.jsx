'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            <h1>Informações Postadas</h1>
            <ul>
                {informacoes.map((info, index) => (
                    <li key={index}>
                        <strong>Email:</strong> {info.email}, <strong>Mensagem:</strong> {info.message}
                    </li>
                ))}
            </ul>
        </>
    );
}