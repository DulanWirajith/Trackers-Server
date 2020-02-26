const Locations = require('./../database/Locations');
const { getDistance, convertDistance, getSpeed, convertSpeed } = require('geolib');
const AssignDriver = require('./../database/AssignDriver');

// save locations

exports.saveLocations = (req, res, next) => {
    Locations.getLocation(c => c.bus_no === req.body.bus_no).then((result) => {
        // console.log(result);
        const pre_location = {
            latitude: result.current_location.latitude,
            longitude: result.current_location.longitude
        };
        const current_location = {
            latitude: req.body.current_location.latitude,
            longitude: req.body.current_location.longitude
        };
        // console.log(pre_location);
        // console.log(current_location);
        let distance = convertDistance(getDistance(pre_location, current_location, 1000), 'km');
        // console.log(convertDistance(distance, 'km'));
        Locations.saveLocation({
            bus_no: req.body.bus_no,
            distance: distance,
            current_location: req.body.current_location,
            weather: req.body.weather,
            road_condition: req.body.road_condition,
            bus_time: Date.now()
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
    }).catch((error) => {
        console.log(error);
        res.status(400).json({
            messege: 'get latest bus location failed'
        });
    });    
         
};
    
// get latest location

exports.getLocation = (req, res, next) => {
    Locations.getLocation({
        // bus_no: req.body.bus_no
    }).then((result) => {
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