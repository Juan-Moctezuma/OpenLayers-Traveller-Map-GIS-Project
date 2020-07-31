# OpenLayers-Traveller-Map-GIS-Project

### Introduction

OpenLayers (GIS software), is an open-source JavaScript library that serves the
purpose of displaying map data. The goal of this website is to pin point the world
cities that have been visited by the author of this project. Geographical coordinate 
data gets fetched from a .JSON document within the file system and it's viewable as 
long as the program runs in a local web server.

### Link
Link on Heroku: https://juan-s-travel-map-gis-project.herokuapp.com/

### How to run local web server for testing purposes?

`python -m SimpleHTTPServer 9000`

if you are on Mac, use terminal and type the previous command; but first 
make sure you are in the correct directory (the folder containing your project).
NOTE that you don't need to request port 9000, you may use (e.g.) 8000.

### Technologies

1. HTML
2. CSS
   * Responsive Framework: Materialize
3. JavaScript
   * OpenLayers: version 6.3.1
   * ES6
4. Vector Data: .JSON and .geoJSON
5. Node.js
   * Web Application Framework: Express.js
5. Python 2 (via Live/local Server)
