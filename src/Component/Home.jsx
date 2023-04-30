// Importing the necessary modules 
import '../App.css'; 
import React, { Component, Fragment } from 'react'
import "leaflet/dist/leaflet.css"; 
import { Icon} from 'leaflet';
import gasMask from '../Images/gas-mask.png'; 
import { getAreaAndRandomCoords, getPolygonCoords } from './Polygon';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3'; 
import { MapContainer, TileLayer, Marker, Popup, Circle, CircleMarker, Polygon } from 'react-leaflet'

// Creating an icon 
const customIcon = new Icon({
    iconUrl: gasMask, 
    iconSize: [28, 28]
})

// Polygon props 
const polygonOptions = {
    color: '#ff5c33', 
    fillColor: '#ff5c33', 
    fillOpacity: 0.58, 
    weight: 1
}

// Circle marker 
const circleMarkerOptions = {
    radius: 16, 
    stroke: "", 
    pathOptions: {
        color: '#f4f7f0', 
        fillColor: 'red', 
        fillOpacity: 0.02, 
        weight: 0.5, 
    }, 
}


// Creating the UI component 
class Home extends Component {
    // Setting the state 
    state = {
        lat: 51.505, 
        lng: -0.09, 
        windDirection: 45, 
        intensity: 2.8, 
    } 

    // Rendering the component 
    render() {
        // Return the jsx component 
        return (
            <Fragment> 
                {/* Adding the map-leaflet */}
                <MapContainer center={[this.state.lat, this.state.lng]} zoom={5} scrollwheelZoom={false}>
                <TileLayer 
                    attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, 
                    <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; 
                    Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

                {/* Adding a main circle */}
                <Circle center={[this.state.lat, this.state.lng]} radius={500} color="green" fillColor='#330a00' fillOpacity={0.9}>  
                    <Popup> 
                        <p style={{"fontWeight": "bold"}}> Source of Toxic Release </p>
                    </Popup>
                </Circle>

                {/* Adding popup for each heat map */}
                <Polygon positions={getPolygonCoords([this.state.lat, this.state.lng], this.state.windDirection)} color="blue"  pathOptions={polygonOptions} >
                    {
                        getAreaAndRandomCoords([this.state.lat, this.state.lng], this.state.windDirection).map((point, index) => {
                            // Displaying the name 
                            return (
                                <Marker position={[point[0], point[1]]} icon={customIcon}> 
                                    <Popup> 
                                        <p> The downwind concentration is: {point[0]}ppm </p>
                                    </Popup>
                                </Marker>
                            )

                        })
                    }
                </Polygon> 

                {/* Adding the heat map  */}
                <HeatmapLayer
                    fitBoundsOnLoad
                    radius={25}
                    fitBoundsOnUpdate
                    opacity={0.4}
                    max={100}
                    minOpacity={0.5}
                    points={getAreaAndRandomCoords([this.state.lat, this.state.lng], this.state.windDirection)}
                    longitudeExtractor={(point) => point[1]}
                    latitudeExtractor={(point) => point[0]}
                    intensityExtractor={(m) => parseFloat(m[1])}
                />

                </MapContainer>
            </Fragment>
        )
    }
}

// Exporting the Home page 
export default Home; 