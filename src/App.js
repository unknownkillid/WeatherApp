import './App.css';
import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=35ae895d267158f68d7f412a8879fe4a`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="app-div">
          <div className="search">
            <input
              className='input'
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              placeholder='Enter Location'
            />
          </div>
          <div className="top">
            <div className="column-titles">
              <div className="city">
                <p>{data.name}</p>
              </div>
              <div className="deg">
                {data.main ? <h1>{data.main.temp} °C</h1> : null}
              </div>
            </div>
            <div className="feels">
              {data.main ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          <div className="bottom">
            <div className="degree">
              {data.main ? <p>{data.main.feels_like}</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p>{data.main.humidity}</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p>{data.wind.speed} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
