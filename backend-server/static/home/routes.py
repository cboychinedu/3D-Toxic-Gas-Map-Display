#!/usr/bin/env python3 

# Importing the necessary modules 
import requests
import os 
import json 
from flask import Blueprint
from flask import request
from dotenv import dotenv_values, load_dotenv 
from flask import render_template, redirect, url_for 

# Creating the blueprint object 
home = Blueprint('home', __name__, template_folder='templates', static_folder='static')

# Loading the environment variables 
load_dotenv() 

# Creating the home page route 
@home.route('/', methods=['GET']) 
def HomePage(): 
    data = {
        "Firstname": "Mbonu", 
        "Lastname": "Chinedum"
    }

    # Sending the data 
    return data; 

# Creating a route for calculating the air quality 
@home.route('/air-properties', methods=['POST', 'GET'])
def GetAirProperties(): 
    if request.method == "POST": 
        request_body = request.get_json(); 

        # Getting the latitude and longitude 
        latitude = request_body['latitude']
        longitude = request_body['longitude']

        # Adding the latitude, and longitude into the URI
        API_KEY = os.getenv("API_KEY")
        URI = f"""https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={API_KEY}"""

        # Making request to the API service 
        response = requests.get(URI); 
        data = response.json(); 
        
        # Converting the data into a json object  
        airProperties = json.dumps(data); 

        # Sending back the json object 
        return airProperties

    

    # Creating the air properties
    """
    We should note that the properties generated below are calculated from a mathematical algorithm. 
    The result is outputted into the airProperties variable as a JSON object.

    The mathematical algorithm is responsible for generating coordinate values for each request
    made to the air-velocity and direction API for that specific location."
    """ 
    
    # Air properties 
    airProperties = {
        "type": "Air properties", 
        "format": "json",
        "features": [
            { 
                "properties": {
                    "concentrationUnits": "ppm", 
                    "windVelocity": "mph", 
                    "windDirection": "NE", 
                    "bearingMeasurement": "degrees", 
                }, 
                "geometry": {
                    "type": "co-ordinates", 
                    "coordinates": [39.050619679238508, 55.664990339319459], 
                    "downwindConcentration": 25.66, 
                    "windVelocity": 3.45, 
                    "windBearing": 67.09, 
                    "intensity": 55.987, 
                }
            }
        ] 

    }

    # Converting the data into a json object  
    airProperties = json.dumps(airProperties); 

    # Sending back the json object 
    return airProperties

