import React from "react";
import styles from './Button.module.css'
import { useState } from 'react'

const Buttons = ({ functionName, titulo, type, typeButton }) => {
    if (typeButton == 'delete') {
        return (
            <button onClick={functionName} type={type} className={`${styles.button} ${styles.deleteButton}`}>
                {titulo}
            </button>
        )
    } else if (typeButton == 'edit') {
        return (
            <button onClick={functionName} type={type} className={`${styles.button} ${styles.editButton}`}>
                {titulo}
            </button>
        )
    } else if (typeButton == 'insta') {
        return (
            <button onClick={functionName} type={type} className={`${styles.button} ${styles.instaButton}`}>
                {titulo}
            </button>
        )
    } else {
        return (
            <button onClick={functionName} type={type} className={`${styles.button}`}>
                {titulo}
            </button>
        )
    }
};


export default Buttons;