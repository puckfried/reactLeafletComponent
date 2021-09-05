import countries from '../data/countries.geo.json'
import capitals from '../data/capitals.geo.json'


//Functions for handling the map and geo.json files



// getting polygon coordinates of the country from geo.json file
export const fetchAllBorders = async (country, L) => {
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

    return latLngs
    }}




//Using OSM nominatim for fetching clicked country
export const fetchCountryByCoord = async (coordinates) => {
    const {lat, lng} = (coordinates.latlng)
    try{
        //get english country name 
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=3&accept-language=en`)
        const dataEn = await res.json()
        return dataEn}
    catch(error){
        console.log(error)
    }}



// Centering the map when the country changes using the coordinates of its capital    
export const newCenterCoord = async (country) => {
    const newCenter = capitals.features.filter(element => element.properties.country === country )
    if (newCenter.length>0){
        let coordinates = [...newCenter[0].geometry.coordinates]
        let fixedCoord = coordinates.reverse()
        return fixedCoord
        }
    else {
        console.log('Something is wrong with centering ', country,' the json found is',newCenter) 
    }
}