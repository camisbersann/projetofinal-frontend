import React from "react";
import styles from './Input.module.css'

const InputRegisters = ({ type, varName, setVarName, label }) => {
    return (

       

        <div className={styles.group}>
            <label className={styles.label} htmlFor={varName}>
                {label}:
            </label>
            <input className={styles.input}
             type={type} 
             value={varName}
              onChange= {(e) => setVarName(e.target.value)}
             />
        </div>



    )
}

export default InputRegisters;
