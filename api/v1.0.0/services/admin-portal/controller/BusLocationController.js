const Locations = require('./../database/Locations');
const { getDistance, convertDistance } = require('geolib');
const AssignDriver = require('./../database/AssignDriver');

// save locations
// console.log('hello');
// console.log(this.getLocation.previous_location.latitude);

exports.saveLocations = (req, res, next) => {
    const current_location = {
        latitude: req.body.current_location.latitude,
        longitude: req.body.current_location.longitude
    };

    // me previous location eka database eken ganna widiha poddak balapan. meka weradiy.
    const pre_location = {
        latitude: this.getLocation.previous_location.latitude,
        longitude: this.getLocation.previous_location.longitude
    };
    
    let distance = convertDistance(getDistance(pre_location, current_location, 1000), 'km');
    // console.log(convertDistance(distance, 'km'));
    Locations.saveLocation({
        bus_no: req.body.bus_no,
        distance: distance,
        previous_location: req.body.current_location,       // current location eka save wenne previous eka widihata
        weather: req.body.weather,
        road_condition: req.body.road_condition,
        date: req.body.date
    }).then((result) => {
                console.log('Location Added!');
                res.status(200).json({
                    messege: 'Location Added!'
                });
            }).catch((error) => {
                console.log(error);
                res.status(500).json({
                    messege: 'Location Added Failed'
                });
            });     
    };
    
// get latest location

exports.getLocation = (req, res, next) => {
    Locations.getLocation({}).then((result) => {
        console.log(result);
        res.status(200).json({
            messege: result
        });
    }).catch((error) => {
        console.log(error);
        res.status(400).json({
            messege: 'get latest bus location failed'
        });
    });
};

// get all bus locations

exports.getLocations = (req, res, next) => {
    Locations.getLocations({}).then((result) => {
        console.log(result);
        res.status(200).json({
            messege: result
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            messege: 'Get bus location details failed!'
        });
    });
};


// to get weather

exports.getWeather = (req, res, next) => {

};