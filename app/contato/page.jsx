'use client'
import React from 'react'
import InputRegisters from '../components/Input/Input'
import { useState, useEffect } from 'react'
import Buttons from '../components/Button/Button'
import axios from 'axios'

export default function Contato() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const enviarContact = async (e) => {
        e.preventDefault()

        try {
            await axios.post('/api/contact', { email, message })
            setEmail('')
            setMessage('')
        } catch (error) {
            console.error('Error fetching data:', error)
            setMessage('')
        }
    }

    return (
        <>
            <h1>Contato</h1>
            <div>
                <InputRegisters type={'text'} varName={email} setVarName={setEmail} label={'Email'} />
                <InputRegisters type={'text'} varName={message} setVarName={setMessage} label={'Mensagem'} />
                <Buttons titulo={'Enviar'} functionName={enviarContact} typeButton={'default'} />
            </div>
        </>
    )
}