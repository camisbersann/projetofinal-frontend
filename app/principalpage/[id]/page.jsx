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
  const [minCities, setMinCities] = useState(10);
  const [maxCities, setMaxCities] = useState(860);

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

      setSelectedTransport(null);
      setSelectedTravel(null);
      setDistance(null);
      setDrivingTime(null);
      setPrice(null);

      attuserClient();
    } catch (error) {
      console.error('Erro ao comprar a viagem:', error);
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
        const geocodeResponse = await axios.get(`https://api.distancematrix.ai/maps/api/geocode/json?address=1600,${nomedarua},${addressResponse.data.localidade},${addressResponse.data.uf},Brazil&key=wRCFkb3MVLhftAu8BwZG2pO7R8bJjX2yMHEAeX5rzviJ3e6AwtBTyfJudVtiCWsb`);
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
          `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${clientLocation.result[0].geometry.location.lat},${clientLocation.result[0].geometry.location.lng}&destinations=${selected.coordenadasCapital.latitude},${selected.coordenadasCapital.longitude}&key=Cqq5IynsxmFSMJ3RrCmZQCbhSv2gUQrynEGGU4dF2dfMb58tVSVVgjlSjSYehB12`
        );
        setDistance(distanceResponse.data.rows[0].elements[0].distance.text);
        setDrivingTime(distanceResponse.data.rows[0].elements[0].duration.text);
      } catch (error) {
        console.error('Erro ao calcular a distância:', error);
      }
    }
  };

  // Render draggable city range filter component
  const CityRangeFilter = () => (
    <div className={styles.cityRangeFilter}>
      <p>Minimum Cities: {minCities}</p>
      <input
        type="range"
        min={10}
        max={860}
        value={minCities}
        onChange={(e) => setMinCities(parseInt(e.target.value))}
      />
      <p>Maximum Cities: {maxCities}</p>
      <input
        type="range"
        min={10}
        max={860}
        value={maxCities}
        onChange={(e) => setMaxCities(parseInt(e.target.value))}
      />
    </div>
  );

  return (
    <div className={styles.container}>
      <Header />
      {
        !logged ? (
          <Login setInputPassword={setInputPassword} password={password} setLogged={setLogged} passwordInput={inputPassword} />
        ) : (
          <>
            <CityRangeFilter />

            <RegionSelector
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              regions={regions}
            />
            <div className={styles.travelList}>
              {
                selectedRegion === "Todos" ? (<>
                  {regions.map((region) => (
                    <div key={region} className={styles.regionCard}>
                      <h2>{region}</h2>
                      <div className={styles.travelCards}>
                        {travels01
                          .filter(
                            (travel) =>
                              travel.region === region &&
                              travel.cities >= minCities &&
                              travel.cities <= maxCities
                          )
                          .map((filteredTravel) => (
                            <TravelCard
                              key={filteredTravel.id}
                              travel={filteredTravel}
                              handleTravelClick={handleTravelClick}
                            />
                          ))}
                      </div>
                    </div>
                  ))}</>) : (<>
                    <div className={styles.regionCard}>
                      <h2>{selectedRegion}</h2>
                      <div className={styles.travelCards}>
                        {travels01
                          .filter(
                            (travel) =>
                              travel.region === selectedRegion &&
                              travel.cities >= minCities &&
                              travel.cities <= maxCities
                          )
                          .map((filteredTravel) => (
                            <TravelCard
                              key={filteredTravel.id}
                              travel={filteredTravel}
                              handleTravelClick={handleTravelClick}
                            />
                          ))}
                      </div>
                    </div>
                  </>)
              }
            </div>

            {selectedTravel && (
              <div className={styles.selectedTravel}>
                <h3 className={styles.travelTitle}>Viagem Selecionada:</h3>
                <p><strong>Região:</strong> {selectedTravel.name}</p>
                <p><strong>Distância:</strong> {distance}</p>
                <p><strong>Tempo:</strong> {drivingTime}</p>

                <div className={styles.buttonDiv}>
                <button onClick={() => handleTransportButtonClick('taxi')} className={styles.transportButton}>Táxi</button>
                <button onClick={() => handleTransportButtonClick('onibus')} className={styles.transportButton}>Ônibus</button>
                <button onClick={() => handleTransportButtonClick('aviao')} className={styles.transportButton}>Avião</button>
                </div>
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

            <div className={styles.travelDiv}>
              <h2 className={styles.principalTitle}>Viagens compradas</h2>
              <div className={styles.travelList}>
                {oldTravels.map((travel) => (
                  <div key={travel.id} className={styles.travelCard}>
                    <h3 className={styles.cardTitle}>{travel.name}</h3>
                    <p><strong>Distância:</strong> {travel.distance}</p>
                    <p><strong>Tempo de viagem:</strong>{travel.drivingTime}</p>
                    <p><strong>Transporte:</strong> {travel.transport}</p>
                    <hr className={styles.divider}></hr>
                    <p className={styles.price}><span>$</span> {travel.price}</p>
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
