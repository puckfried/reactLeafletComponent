import './App.css';
import React, {useState} from 'react';
import Header from './Components/Header';
import MapWrapper from './Components/MapWrapper';

function App() {
  const [country, setCountry] = useState('Spain')
  const [mapStyle, setMapStyle] = useState('topo')

  return (
    <div className="App">
      <Header country={country} setCountry={setCountry} setMapStyle={setMapStyle} /> 
      <MapWrapper country={country} setCountry={setCountry} mapStyle={mapStyle} />
    </div>
  );
}

export default App;
