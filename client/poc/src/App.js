import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

const api = {
  base: "http://localhost:3000"
}



function App() {

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}?q=${query}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  return (
    <div className="App">
      
      <header className="App-header">


          <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Informe um endereço..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.temperature != "undefined") ? (
        <div>
          <div className="location-box">
            {<div className="location">{weather.city}</div>}
             
             <div className="lat">{weather.latitude}</div>
             <div className="long">{weather.longitude}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.temperature)}°c
            </div>
            
          </div>
        </div>
        ) : ('')}

      </header>
    </div>
  );
}

export default App;
