import React from 'react'
import capitals from './data/capitals.geo.json'

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
            <select onChange={(e) => selectCountry(e)} name="country" id="countrySelect">
                {capitals.features.map( element => {
                    const mapCountry = element.properties.country
                    return(
                        <option value={mapCountry}selected={country === mapCountry ? true : false}>{mapCountry}</option>
                    )
                })}

            </select>
            <select onChange={(e) => selectMap(e)} name="Map Style">
                <option value="osm">OSM Standard</option>
                <option value="hot">Huminatarian</option>
                <option value="topo" selected>Topos Style</option>
            </select>
        </div>
    )
}
