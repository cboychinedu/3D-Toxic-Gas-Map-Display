// Importing the necessary modules 
import React, { Component, Fragment } from 'react'; 
import L from 'leaflet'; 
import { polygon, area, point, destination, bbox, randomPoint } from '@turf/turf';

// Creating a function for getting the polygon area, and each respective 
// coordinate 
const getAreaAndRandomCoords = (center, windDirection) => {

    // Getting the polygon co-ordinates 
    const polygonCoords = getPolygonCoords(center, windDirection); 
    const turfPolygon = polygon([polygonCoords]); 
    const boundingBox = bbox(turfPolygon); 

    // Calculating the area of the polygon 
    let polygonArea = area(turfPolygon);  

    // 
    const numberOfPoints = 300; 
    const randomPointsCoordinates = []; 

    for (let i = 0; i< numberOfPoints; i++) {
        const randomPointsInside = randomPoint(1, {bbox: boundingBox }); 
        randomPointsCoordinates.push(randomPointsInside.features[0].geometry.coordinates); 
        // console.log(randomPointsInside.features[0].geometry.coordinates)
    }

    // console.log(randomPointsCoordinates)
    /**
     * Implementing the Pasquill-Gifford Algorithm here.
     * By connecting to the backend server and sending all the random point coordinates,
     * including the initial center point, which will serve as a reference for calculating
     * the downwind concentration values.
     **/

    // 
    return randomPointsCoordinates; 
}

// Creating a function for getting the polygon coordinates 
const getPolygonCoords = (center, windDirection) => {
    // 
    let polygonCoords = []; 

    // Calculate the coordinates for the wind direction polygon 
    const angleIncrement = 360 / 7; 
    const vertexDistance = 10; 

    // Using a for loop 
    for (let i = 0; i < 6; i++) {
        if (i === 0) {
            const angle = i * angleIncrement + windDirection; 
            const vertex = destination(center, vertexDistance, angle).geometry.coordinates; 
            polygonCoords.push(center)
            // polygonCoords.push(vertex)
            continue; 
            
        }

        if (i === 6 ) {
            const angle = i * angleIncrement + windDirection; 
            const vertex = destination(center, vertexDistance, angle).geometry.coordinates; 
            polygonCoords.push(center)
            continue; 
            
        }
        // 
        const angle = i * angleIncrement + windDirection; 
        const vertex = destination(center, vertexDistance, angle).geometry.coordinates; 
        polygonCoords.push(vertex); 
    }

    // Close the polygon 
    polygonCoords.push(polygonCoords[0]); 

    return polygonCoords; 
}

// Exporting 
export { getPolygonCoords, getAreaAndRandomCoords }; 
 