#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import math 
import cmath 

# Creating a function for converting the rectangular co-ordinates 
# to polar co-ordinates 
def rect_to_polar(x, y): 
    r = math.sqrt(x**2 + y**2) 
    theta = math.atan2(y, x) 

    # Returning the result 
    return (r, theta) 

# Creating a function for converting the polar co-ordinates 
# to rectangular co-ordinates 
def polar_to_rect(r, theta): 
    x = r * math.cos(theta) 
    y = r * math.sin(theta) 

    # Returning the result 
    return [x, y]  ## <-- This should be the lat, and long... 


# Degug 
result = polar_to_rect(10, 358)
print(result); 
