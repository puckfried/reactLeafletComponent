import React, {useState, useEffect} from 'react'
import { Map, TileLayer, Polygon } from 'react-leaflet'
import countries from '../data/countries.geo.json'
import capitals from '../data/capitals.geo.json'
import L from 'leaflet'

export default function MapWrapper(props) {
    const [border, setBorder] = useState([])
    const polyColor = 'red'
    const [mapCenter, setMapCenter] = useState([51.505, -0.09])
    const {country, setCountry, mapStyle} = props
   

    //Using OSM nominatim for fetching clicked country
    const fetchCountry = async (e) => {
        const {lat, lng} = (e.latlng)
        try{
            //get english country name 
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=3&accept-language=en`)
            const dataEn = await res.json()
            
            //function for calculating borders
            await fetchBorder(dataEn.address.country)
            //setting the country state for further use
            await setCountry(() => dataEn.address.country)
        }
        catch(error){
            return error
        }
    }
    
    // getting polygon coordinates of the country
    const fetchBorder = async (country = 'France') => {
        let latLngs =[]
        let coordinates = []
        let type = 'Polygon'

        // Filter geo.json list of countries
        const filter = countries.features.filter( element => element.properties.name === country)
        if (filter[0]){
            type = filter[0].geometry.type
            coordinates = filter[0].geometry.coordinates
        
        //change postion of coordinates using build in method of leaflet with specified depth of the array 
        if (type === 'Polygon') latLngs = L.GeoJSON.coordsToLatLngs(coordinates,1);
        else if (type === 'MultiPolygon') latLngs = L.GeoJSON.coordsToLatLngs(coordinates,2);
        setBorder(() => latLngs)  
    }}

    // Centering the map when the country changes
    const changeCenter = (country) => {
        const newCenter = capitals.features.filter(element => element.properties.country === country )
        if (newCenter.length>0){
            let coordinates = [...newCenter[0].geometry.coordinates]
            let fixedCoord = coordinates.reverse()
            setMapCenter(() => fixedCoord)
        }
        else {
            console.log('Something is wrong with centering ', country,' the json found is',newCenter) 
        }
    }


    useEffect(()=> {
        fetchBorder(country)
        changeCenter(country)
        },[country])


    return (
        <>
            <Map center={mapCenter} zoom={4} scrollWheelZoom={false}
            style={{width: "100vw", height: "100vh"}}
             onClick={(e) => fetchCountry(e)}
            >
                <TileLayer
                    attribution={
                        ('&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors') + 
                        (mapStyle === 'topo' ? ' - SRTM | Kartendarstellung: <a href="http://opentopomap.org/">OpenTopoMap</a>' 
                        : mapStyle === 'hot' ? ' - fond de carte par <a href="https://www.hotosm.org/updates/2013-09-29_a_new_window_on_openstreetmap_data">Yohan Boniface & Humanitarian OSM Team</a> sous <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.fr">licence domaine public CC0</a> 🏠 hébergé par <a href="https://www.openstreetmap.fr/mentions-legales/">OSM France</a>'
                        : '')}
                    url={mapStyle === 'topo' ? "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" :
                         mapStyle === 'hot'  ? "http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" :
                         "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        }
                 />
                 <Polygon color={polyColor} positions={border} />
            </Map>
        </>
    )
}
