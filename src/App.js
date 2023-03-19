import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Weather from "./components/Weather";
import { Dimmer, Loader } from 'semantic-ui-react';

export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      getWeatherData(position.coords.latitude, position.coords.longitude);
    });
  }, [lat, long]);

  const getWeatherData = async (lat, long) => {
    const resp = await axios.get(
      `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
    );
    console.log(resp.data, ":::");
    if (resp.status == 200) {
      setData(resp.data);
    }
  };
  return (
    <div className="App">
      {typeof data.main != "undefined" ? (
        <Weather weatherData={data} />
      ) : (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
}
