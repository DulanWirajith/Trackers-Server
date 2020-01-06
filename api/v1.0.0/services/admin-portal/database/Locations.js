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

exports.getLocations = () => {
    return new Promise((resolve, reject) => {
        Bus_Realtime_Location.find({}).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};