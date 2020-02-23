const Locations = require('./../database/Locations');
const AssignDriver = require('./../database/AssignDriver');

// save locations

exports.saveLocations = (req, res, next) => {
    Location.saveLocations({
        bus_no: req.body.bus_no,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        date: req.body.date,
        bus_time: req.body.bus_time
    }).then((result) => {
        Locations.getLocations({
            speed_of_bus: (req.body.longitude + req.body.latitude) / req.body.time_duration
        }).then((result) => {
            Locations.saveLocation((req.body)).then((result) => {
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
        });        
    }).catch((error) => {
        res.status(500).json({
            messege: 'Error!'
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

// function to calculate distance

exports.calculateDistance = (req, res, next) => {

};