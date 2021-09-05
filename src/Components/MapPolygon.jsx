import React, {useState, useEffect} from 'react'
import { Polygon } from 'react-leaflet'

import { fetchAllBorders } from '../functions/mapFunctions'


export default function MapPolygon(props) {
  
    const {polyColor,L, country } = props
    let [localBorder, setLocalBorder] = useState([])

    useEffect(()=> {
        fetchAllBorders(country, L, setLocalBorder)
            .then((resolve) => setLocalBorder(() => resolve ))   
    },[])

    return (
        <>
            <Polygon color={polyColor} positions={localBorder} />
        </>
    )
}
