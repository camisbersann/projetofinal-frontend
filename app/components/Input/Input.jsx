import React from "react";
import styles from './Input.module.css'

const InputRegisters = ({ type, varName, setVarName, label }) => {
    return (





        <div className={styles.group}>
            <input className={styles.input}
                type={type}
                value={varName}
                onChange={(e) => setVarName(e.target.value)} />
            <span className={styles.highlight}></span>
            <span className={styles.bar}></span>
            <label className={styles.label} htmlFor={varName}>
                {label}:
            </label>
        </div>



    )
}

export default InputRegisters;
