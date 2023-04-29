#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import logging 
from flask import render_template 
from flask import Flask, url_for 
from flask_cors import CORS 
from datetime import datetime 
from static.home.routes import home 
from dotenv import dotenv_values, load_dotenv 

# Creating the flask application 
app = Flask(__name__) 
app.config['TEMPLATES_AUTO_RELOAD'] = True 

# Setting the cors configuration 
CORS(app) 

# Loading the environment variables 
load_dotenv() 

# Register the views  
app.register_blueprint(home, url_prefix='/')

# Logging the configurations to a file on disk 
logging.basicConfig(filename='requests.log', level=logging.DEBUG, 
                    format='%(asctime)s %(message)s %(filename)s %(module)s %(pathname)s', 
                    datefmt='%m/%d/%Y %I:%M:%S %p')

# Handling custom error pages 
@app.errorhandler(404)
def page_not_found(error): 
    # Execute this route if the user navigates to a route that 
    # does not exist 
    return 'Error 404', 404; 

# Handling error request 500 
@app.errorhandler(500)
def page_not_found(error): 
    # Execute this route if the user navigates to a route that 
    # does not exist 
    return 'Error 500', 500; 

# Adding functions for updating the web application on reload
@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)

# Creating a function called dated url for tracking the changes made
def dated_url_for(endpoint, **values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(app.root_path,
                                 endpoint, filename)
            values['q'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)

# Setting the port and host 
port = 5001
host = 'localhost'
print(f"The server is running on: {host}:{port}")

# Running the flask application 
if __name__ == "__main__": 
    app.run(port=5001, 
            host='localhost', 
            debug=True)