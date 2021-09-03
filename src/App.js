import './App.css';
import React, {useState} from 'react';
import Header from './Header';
import MapWrapper from './mapWrapper';

function App() {
  const [country, setCountry] = useState('')
  const [mapStyle, setMapStyle] = useState('topo')

  return (
    <div className="App">
      <Header country={country} setCountry={setCountry} setMapStyle={setMapStyle} /> 
      <MapWrapper country={country} setCountry={setCountry} mapStyle={mapStyle} />
      <div className='absolute'><h1>I am a absolute text</h1></div>
    </div>
  );
}

export default App;
