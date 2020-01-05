const Bus_Entity = require('./../entity/Bus_Entity');
const mongoose = require('mongoose');

exports.saveBus = (bus_object) => {
    return new Promise((resolve, reject) => {
        Bus_Entity.create(bus_object).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};

exports.searchBus = (bus_no) => {
    return new Promise((resolve, reject) => {
        Bus_Entity.findOne(bus_no).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};

exports.getBus = (query1) => {
    return new Promise((resolve, reject) => {
      Bus_Entity.findOne(query1).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  };
  
  exports.getAllBuses = () => {
    return new Promise((resolve, reject) => {
      Bus_Entity.find({}).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  };

exports.updateBus = (query1, bus_object) => {
    return new Promise((resolve, reject) => {
        Bus_Entity.findOneAndUpdate(query1, bus_object).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};