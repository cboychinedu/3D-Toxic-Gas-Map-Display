// Importing the necessary modules 
import '../App.css'; 
import React, { Component, Fragment } from 'react'
import "leaflet/dist/leaflet.css"; 
import { Icon } from 'leaflet';
import { geojson } from './data'; 
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3'; 
import { MapContainer, TileLayer, Marker, Popup, Circle, CircleMarker } from 'react-leaflet'

// Creating an icon 
const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/484/484167.png", 
    iconSize: [38, 38]
  })

// Creating the UI component 
class Home extends Component {
    // Setting the state 
    state = {
        lat: 51.505, 
        lng: -0.09, 
        intensity: 2.8, 
    } 


    // Rendering the component 
    render() {
        // Return the jsx component 
        return (
            <Fragment> 
                {/* Adding the map-leaflet */}
                <MapContainer center={[this.state.lat, this.state.lng]} zoom={13} scrollwheelZoom={false}>
                <TileLayer attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

                <HeatmapLayer
                    fitBoundsOnLoad
                    fitBoundsOnUpdate
                    opacity={0.9}
                    max={100}
                    minOpacity={0.4}
                    points={geojson.features}
                    longitudeExtractor={m => m.geometry.coordinates[0]}
                    latitudeExtractor={m => m.geometry.coordinates[1]}
                    intensityExtractor={m => parseFloat(m.geometry.coordinates[1])}
                />

                </MapContainer>
            </Fragment>
        )
    }
}

// Exporting the Home page 
export default Home; 