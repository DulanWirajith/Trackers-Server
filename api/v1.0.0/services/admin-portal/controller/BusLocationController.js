const Locations = require('./../database/Locations');
const DriverEntity = require('./../../mobile-applications/driver-app/entity/Driver_Entity');
const Driver = require('./../../mobile-applications/driver-app/database/Driver');

// save locations

exports.saveLocations = (req, res, next) => {
    // Driver.getDriver({
    // })
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
            messege: 'Get bus locations failed!'
        });
    });
};