const Driver_Entity = require('./../entity/Driver_Entity');
const mongoose = require('mongoose');

exports.saveDriver = (driver_object) => {
    return new Promise((resolve, reject) => {
        Driver_Entity.create(driver_object).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};

exports.searchDriver = (driver_mail) => {
    return new Promise((resolve, reject) => {
        Driver_Entity.findOne(driver_mail).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};

exports.getDriver = (query1) => {
    return new Promise((resolve, reject) => {
      Driver_Entity.findOne(query1).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  };
  
  exports.getAllDrivers = () => {
    return new Promise((resolve, reject) => {
      Driver_Entity.find({}).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  };

exports.updateDriver = (query1, driver_object) => {
    return new Promise((resolve, reject) => {
        Driver_Entity.findOneAndUpdate(query1, driver_object).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    });
};

exports.updatePassword = (query1, driver_object) => {
    return new Promise((resolve, reject) => {
        Driver_Entity.findOneAndUpdate(query1, driver_object).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    });
};
