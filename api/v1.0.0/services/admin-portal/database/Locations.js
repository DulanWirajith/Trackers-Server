const Bus_Realtime_Location = require('./../entity/Bus_Realtime_Location');
const mongoose = require('mongoose');

exports.saveLocation = (location_object) => {
    return new Promise((resolve, reject) => {
        Bus_Realtime_Location.create(location_object).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};

// get latest location

exports.getLocation = (bus_no) => {
    return new Promise((resolve, reject) => {
        Bus_Realtime_Location.findOne(bus_no).sort({_id: -1})
        .then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};

// get latest location for android

exports.getLatestLocation = (bus_no) => {
    return new Promise((resolve, reject) => {
        Bus_Realtime_Location.findOne(bus_no).sort({_id: -1}).select({current_location: -1})
        .then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};

// get all locations

exports.getLocations = () => {
    return new Promise((resolve, reject) => {
        Bus_Realtime_Location.find({}).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};
