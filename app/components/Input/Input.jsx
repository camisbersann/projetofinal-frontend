import React from "react";


const Input = ({ type, id, value, onChange, required, label }) => {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label} htmlFor={id}>
                {label}:
            </label>
            <input className={styles.input} type={type} id={id} value={value} onChange={onChange} required={required}></input>
        </div>
    );
};

export default Input;