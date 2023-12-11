import styles from "./MensageError.module.css"
import React from "react";

const PopupMessage =({errorMessage,status}) => {
    if (status == 'success') {
        return (
            <div className={styles.successMessage}>
                <p>{errorMessage}</p>
            </div>
        )
    } else if (status == 'error') {

        return (
            <div className={styles.errorMessage}>
                <p>{errorMessage}</p>
            </div>
        )
    } else {
        return (
            <div className={styles.notShow}>
                <p>{errorMessage}</p>
            </div>
        )
    }
}

export default PopupMessage;