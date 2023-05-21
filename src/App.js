import './App.css';
import axios from 'axios';
import React, { useState } from 'react';



function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=35ae895d267158f68d7f412a8879fe4a`;

  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      inputAndAnimations();

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
              id='input'
              className='input'
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              placeholder='Enter Location'
            />
          </div>
          <div className="top">
            <div className="column-titles" id='some'>
              <div className="city">
                <p>{data.name}</p>
              </div>
              <div className="deg">
                {data.main ? <h1 id='cContent'>{data.main.temp} °C</h1> : null}
              </div>
            </div>
            <div className="feels" id='cloud'>
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


function inputAndAnimations() {
  const clouds = document.getElementById('cloud')
  const colums = document.getElementById('some')
  const input = document.getElementById('input')
  if (input.value === '') {
    colums.classList.remove('animate')
    clouds.classList.remove('opac')
  } else {
    colums.classList.add('animate')
    clouds.classList.add('opac')
  }
  requestAnimationFrame(inputAndAnimations)
}

export default App;