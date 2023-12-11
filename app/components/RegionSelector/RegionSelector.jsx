// RegionSelector.jsx
import React from 'react';
import styles from './RegionSelector.module.css';

const RegionSelector = ({ selectedRegion, setSelectedRegion, regions }) => {
  return (
    <div>
      <h2>Escolha a região que deseja viajar</h2>
      <select
        className={styles.select}
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        <option value="Todos">Todos</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionSelector;
