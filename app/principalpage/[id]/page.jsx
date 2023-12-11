'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import { Header } from '@/app/components/header/Header';
import Footer from '@/app/components/footer/Footer';
import TravelCard from '@/app/components/TravelCard/TravelCard';

export default function Home({ params }) {
  const [travels, setTravels] = useState([]);
  const [userClient, setUserClient] = useState([]);
  const [selectedTravel, setSelectedTravel] = useState(null);
  const [clientLocation, setClientLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [drivingTime, setDrivingTime] = useState(null);

  const { id } = params;

  useEffect(() => {
    async function fetchAllTravels() {
      try {
        const response = await axios.get('/api/travels');
        setTravels(response.data);
      } catch (error) {
        console.error('Error fetching travels:', error);
      }
    }

    fetchAllTravels();
  }, []);

  useEffect(() => {
    async function fetchUserClient() {
      try {
        const response = await axios.get(`/api/client/${id}`);
        setUserClient(response.data);
      } catch (error) {
        console.error('Error fetching user client:', error);
      }
    }

    fetchUserClient();
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      try {
        const clientResponse = await axios.get(`http://localhost:3000/api/client/${id}`);
        const addressResponse = await axios.get(`https://viacep.com.br/ws/${clientResponse.data.cep}/json/`);
        const nomedarua = addressResponse.data.logradouro.split(' ').join('+');
        const geocodeResponse = await axios.get(`https://api.distancematrix.ai/maps/api/geocode/json?address=1600,${nomedarua},${addressResponse.data.localidade},${addressResponse.data.uf},Brazil&key=THy76mc8EB7DE1g30epsm4owSuuPhlcIUemw9hpBiKGmRZSs6GaeMd7VijKHQ1N4`);
        setClientLocation(geocodeResponse.data);
      } catch (error) {
        console.error('Error fetching additional data:', error);
      }
    }

    fetchData();
  }, [id, travels]);

  const handleTravelClick = async (selectedTravelId) => {
    const selected = travels.find((travel) => travel.id === selectedTravelId);

    if (selected) {
      setSelectedTravel(selected);

      try {
        const distanceResponse = await axios.get(
          `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${clientLocation.result[0].geometry.location.lat},${clientLocation.result[0].geometry.location.lng}&destinations=${selected.coordenadasCapital.latitude},${selected.coordenadasCapital.longitude}&key=NUG8TVeZxS6TXWwQdv6bMZWWiwCfkKSV6E5IfZ3wdMsGRg7KSkm9jLMVYkGRM3xd`
        );
        setDistance(distanceResponse.data.rows[0].elements[0].distance.text);
        setDrivingTime(distanceResponse.data.rows[0].elements[0].duration.text);
      } catch (error) {
        console.error('Erro ao calcular a distância:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
        <Header />
      <div className={styles.travelList}>
        {travels.map((travel) => (
          <TravelCard key={travel.id} travel={travel} handleTravelClick={handleTravelClick} />
        ))}
      </div>

      {selectedTravel && (
        <div className={styles.selectedTravel}>
          <h3>Viagem Selecionada:</h3>
          <p>{selectedTravel.name}</p>
          <p>{distance}</p>
          <p>{drivingTime}</p>
        </div>
      )}
      <Footer />
    </div>
  );
}
