import React, {useState, useEffect} from 'react'
import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import countries from './data/countries.geo.json'
import L from 'leaflet'

export default function MapWrapper() {
    const [border, setBorder] = useState([])

    const mapClick = (e) => {
        const {lat, lng} = (e.latlng)
        fetchCountry(lat, lng)
    }
    
    const fetchCountry = async (lat,lng) => {
        try{
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=3&accept-language=en`)
            const data = await res.json()
            // setResult(() => data)
            await takeCountry(data)
        }
        catch(error){
            return error
        }
    }

    const takeCountry = async (country) => {
        console.log('From Nominatim and handed over: ', country.address.country)
        fetchBorder(country.address.country)
    }

    const fetchBorder = async (country = 'France') => {
        let latLngs =[]
        let coordinates = []
        let countryCode = require(`./data/countries/DEU.geo.json`) 
        let type = 'Polygon'
        const filter = countries.features.filter( element => element.properties.name === country)
        console.log('Filter gaves me this back: ', filter)
        if (filter[0]){
            console.log('I filtered from country list: ',filter[0].id)
            console.log('I filtered type from country list: ',filter[0].geometry.type)
            type = filter[0].geometry.type
            coordinates = filter[0].geometry.coordinates
            // countryCode = require(`./data/countries/${filter[0].id}.geo.json`) 
        }
        try{
            // const res = await fetch(`https://nominatim.openstreetmap.org/search?country=${country}&polygon_geojson=1&format=json`)
            // const res = await fetch(`./data/FIN.json`)
            // console.log(res)
            // const data = await res.json()
            if (type === 'Polygon'){
                latLngs = await L.GeoJSON.coordsToLatLngs(coordinates,1);
            }
            else if(type === 'MultiPolygon') {
                latLngs = await L.GeoJSON.coordsToLatLngs(coordinates,2);
            }
             
            console.log('In external JSON I found this data and transformed it: ',latLngs)
            // const latLngs = await L.GeoJSON.coordsToLatLngs(data[0].geojson.coordinates,1); 
          
            await setBorder(() => {
                 return latLngs
             })  
 
        }
        catch(error){
            return error
        }
    }


    const multiPolygon = [
        [
          [51.51, -0.12],
          [51.51, -0.13],
          [51.53, -0.13],
        ],
        [
          [51.51, -0.05],
          [51.51, -0.07],
          [51.53, -0.07],
        ]]
    
    
    const purpleOptions = { color: 'red' }

useEffect(()=> {
    fetchBorder()
    },[])

    return (
        <>
            <Map center={[51.505, -0.09]} zoom={4} scrollWheelZoom={false}
            style={{width: "1500px", height: "800px"}}
            onClick={(e) => mapClick(e)}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    // url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                    // url="https://{a|b|c}.tile.opentopomap.org/{z}/{x}/{y}.png"	
                 />
                 <Polygon pathOptions={purpleOptions} positions={border} />
                {/* <Marker position={[51.505, -0.09]}> */}
                <Marker position={[28.59193, 69.064777]}>    
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </Map>
        </>
    )
}
