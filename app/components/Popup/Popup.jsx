import React from 'react';
import styles from './Popup.module.css';

const Popup = ({ selectedTravel, selectedTransport, price, handleClosePopup, handleBuyTravel }) => {
    return (
        <div className={styles.popup}>
            <h3>Viagem para {selectedTravel.name} de {selectedTransport}</h3>
            <h4>Preço:</h4>
            {selectedTransport === 'taxi' && <p>Taxi: R$ {price}</p>}
            {selectedTransport === 'onibus' && <p>Ônibus: R$ {price}</p>}
            {selectedTransport === 'aviao' && <p>Avião: R$ {price}</p>}
            <div>
                <button onClick={handleClosePopup}>Fechar</button>
                <button onClick={handleBuyTravel} className={styles.comprartravel}>Comprar viagem</button>
            </div>

        </div>
    );
};

export default Popup;