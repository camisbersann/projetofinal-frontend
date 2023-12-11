import React, { useState } from 'react';
import styles from './TravelCard.module.css';

export default function TravelCard({ travel, handleTravelClick }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      key={travel.id}
      onClick={() => handleTravelClick(travel.id)}
      className={`${styles.travelCard} ${showDetails ? styles.showDetails : ''}`}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div className={styles.cardContent}>
        <div className={`${styles.card} ${showDetails ? styles.cardFlipped : ''}`}>
          <div className={styles.cardFront}>
            <img src={travel.image} alt={travel.name} className={styles.cardImage} />
            <div className={styles.cardText}>
              <h3>{travel.name}</h3>
              <p>{travel.description}</p>
            </div>
          </div>
          <div className={styles.cardBack}>
            <img src={travel.flag} alt={`${travel.name} Flag`} className={styles.flag} />
            <div className={styles.detailsText}>
              <p>Population: {travel.population}</p>
              <p>Area: {travel.area}</p>
              <p>Cities: {travel.cities}</p>
              <p>Region: {travel.region}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
