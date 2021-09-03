import React from 'react'
import countries from '../data/countries.geo.json'


export default function Header(props) {
  
    const {country, setCountry, setMapStyle} = props
   
    const selectMap= (e) => {
     setMapStyle(() => e.target.value)
    }

    const selectCountry = (e) =>{
    setCountry(() => e.target.value)
    }
  
    return (
        <div className="header">
            <h3>{country.length<1 ? 'Select a country' : `${country} selected`} </h3>
            <select value={country} onChange={(e) => selectCountry(e)} name="country" id="countrySelect">
                {countries.features.map( (element,index) => {
                    const mapCountry = element.properties.name
                    return(
                        <option key={index} value={mapCountry}>{mapCountry}</option>
                    )
                })}

            </select>
            <select defaultValue='topo' onChange={(e) => selectMap(e)} name="Map Style">
                <option value="osm">OSM Standard</option>
                <option value="hot">Huminatarian</option>
                <option value="topo" selected>Topos Style</option>
            </select>
        </div>
    )
}
