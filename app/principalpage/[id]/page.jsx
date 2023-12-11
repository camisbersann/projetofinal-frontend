'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import { Header } from '@/app/components/header/Header';
import Footer from '@/app/components/footer/Footer';
import TravelCard from '@/app/components/TravelCard/TravelCard';
import Login from '@/app/components/Login/Login';
import RegionSelector from '@/app/components/RegionSelector/RegionSelector';
import Popup from '@/app/components/Popup/Popup';

export default function Home({ params }) {
  const [travels01, setTravels01] = useState([]);
  const [userClient, setUserClient] = useState([]);
  const [selectedTravel, setSelectedTravel] = useState(null);
  const [clientLocation, setClientLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [drivingTime, setDrivingTime] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [money, setMoney] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [oldTravels, setOldTravels] = useState([]);
  const [logged, setLogged] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [regions, setRegions] = useState(['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul']);
  const [selectedRegion, setSelectedRegion] = useState("Todos");

  const { id } = params;

  const handleBuyTravel = async () => {
    try {
      const travel = {
        id: userClient.travels.length,
        name: selectedTravel.name,
        distance: distance,
        drivingTime: drivingTime,
        transport: selectedTransport,
        price: price,
      };

      const travels = [...userClient.travels, travel];

      await axios.put(`/api/client/${id}`, { name, birthdate, email, password, money, cpf, cep, travels });
      setShowPopup(false);

      // Limpa os estados para que possa selecionar uma nova viagem
      setSelectedTransport(null);
      setSelectedTravel(null);
      setDistance(null);
      setDrivingTime(null);
      setPrice(null);

      attuserClient()
    } catch (error) {
      console.error('Erro ao comprar a viagem:', error);
      // Opcional: Adicione uma mensagem de erro para o usuário.
    }
  }

  async function attuserClient() {
    try {
      const response = await axios.get(`/api/client/${id}`);
      setUserClient(response.data);
      setName(response.data.name)
      setBirthDate(response.data.birthdate)
      setEmail(response.data.email)
      setPassword(response.data.password)
      setMoney(response.data.money)
      setCpf(response.data.cpf)
      setCep(response.data.cep)
      setOldTravels(response.data.travels)
    } catch (error) {
      console.error('Error fetching user client:', error);
    }
  }

  const handleTransportButtonClick = (transport) => {
    setSelectedTransport(transport);
    setShowPopup(true);
    const numberKM = parseFloat(distance.split(' ')[0]);
    const numberTime = parseFloat(drivingTime.split(' ')[0]);

    if (userClient.age >= 60) {
      if (transport === 'taxi') {
        setPrice((numberKM / 1000 * 250 * 0.5).toFixed(2).replace('.', ','));
      }
      if (transport === 'onibus') {
        setPrice((numberKM / 1000 * 350 * 0.5).toFixed(2).replace('.', ','));
      }
      if (transport === 'aviao') {
        setPrice((numberKM / 1000 * 950 * 0.5).toFixed(2).replace('.', ','));
      }
    } else {
      if (transport === 'taxi') {
        setPrice((numberKM / 1000 * 250).toFixed(2).replace('.', ','));
      }
      if (transport === 'onibus') {
        setPrice((numberKM / 1000 * 350).toFixed(2).replace('.', ','));
      }
      if (transport === 'aviao') {
        setPrice((numberKM / 1000 * 950).toFixed(2).replace('.', ','));
      }
    }
  };

  const handleClosePopup = () => {
    setSelectedTransport(null);
    setShowPopup(false);
  };

  useEffect(() => {
    async function fetchAllTravels() {
      try {
        const response = await axios.get('/api/travels');
        setTravels01(response.data);
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
        setName(response.data.name)
        setBirthDate(response.data.birthdate)
        setEmail(response.data.email)
        setPassword(response.data.password)
        setMoney(response.data.money)
        setCpf(response.data.cpf)
        setCep(response.data.cep)
        setOldTravels(response.data.travels)
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
        const geocodeResponse = await axios.get(`https://api.distancematrix.ai/maps/api/geocode/json?address=1600,${nomedarua},${addressResponse.data.localidade},${addressResponse.data.uf},Brazil&key=0f0v7GxqJQkkTDnT9aikFthj0YXMgR6yp7SD25p8s8HO6DAX6FXHHOfULemcq3Oa`);
        setClientLocation(geocodeResponse.data);
      } catch (error) {
        console.error('Error fetching additional data:', error);
      }
    }

    fetchData();
  }, [id, travels01]);

  const handleTravelClick = async (selectedTravelId) => {
    const selected = travels01.find((travel) => travel.id === selectedTravelId);

    if (selected) {
      setSelectedTravel(selected);

      try {
        const distanceResponse = await axios.get(
          `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${clientLocation.result[0].geometry.location.lat},${clientLocation.result[0].geometry.location.lng}&destinations=${selected.coordenadasCapital.latitude},${selected.coordenadasCapital.longitude}&key=7Q8BCOGrWmiVFeGeuhXRJD444KeE7iJ8p1wTWYd3kdqxdxPXQBkRr2E2WyzAneKo`
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
      {
        !logged ? (
          <Login setInputPassword={setInputPassword} password={password} setLogged={setLogged} passwordInput={inputPassword} />
        ) : (
          <>
            <RegionSelector
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              regions={regions}
            />
            <div className={styles.travelList}>
              {
                selectedRegion == "Todos" ? (<>
                  {regions.map((region) => (
                    <div key={region} className={styles.regionCard}>
                      <h2>{region}</h2>
                      <div className={styles.travelCards}>
                        {travels01.map((travel) => {
                          if (travel.region === region) {
                            return (
                              <TravelCard key={travel.id} travel={travel} handleTravelClick={handleTravelClick} />
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  ))}</>) : (<>
                    <div className={styles.regionCard}>
                      <h2>{selectedRegion}</h2>
                      <div className={styles.travelCards}>
                        {travels01.map((travel) => {
                          if (travel.region === selectedRegion) {
                            return (
                              <TravelCard key={travel.id} travel={travel} handleTravelClick={handleTravelClick} />
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </>)
              }
            </div>

            {selectedTravel && (
              <div className={styles.selectedTravel}>
                <h3>Viagem Selecionada:</h3>
                <p>{selectedTravel.name}</p>
                <p>{distance}</p>
                <p>{drivingTime}</p>

                <button onClick={() => handleTransportButtonClick('taxi')}>Taxi</button>
                <button onClick={() => handleTransportButtonClick('onibus')}>Ônibus</button>
                <button onClick={() => handleTransportButtonClick('aviao')}>Avião</button>
              </div>
            )}

            {showPopup && (
              <Popup
                selectedTravel={selectedTravel}
                selectedTransport={selectedTransport}
                price={price}
                handleClosePopup={handleClosePopup}
                handleBuyTravel={handleBuyTravel}
              />
            )}

            <div>
              <h2>Viagens compradas</h2>
              <div className={styles.travelList}>
                {oldTravels.map((travel) => (
                  <div key={travel.id} className={styles.travelCard}>
                    <h3>{travel.name}</h3>
                    <p>Distância: {travel.distance}</p>
                    <p>Tempo de viagem: {travel.drivingTime}</p>
                    <p>Transporte: {travel.transport}</p>
                    <p>Preço: {travel.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )
      }
      <Footer />
    </div>
  );
}
