const Passenger_Entity = require('./../entity/Passenger_Entity');
const mongoose = require('mongoose');

exports.savePassenger = (passenger_object) => {
  return new Promise((resolve, reject) => {
    Passenger_Entity.create(passenger_object).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
};

exports.searchPassenger = (passenger_mail) => {
  return new Promise((resolve, reject) => {
    Passenger_Entity.findOne(passenger_mail).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
};

exports.getPassenger = (query1) => {
  return new Promise((resolve, reject) => {
    Passenger_Entity.findOne(query1).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
};

exports.getAllPassengers = () => {
  return new Promise((resolve, reject) => {
    Passenger_Entity.find({}).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
};

exports.updatePassenger = (query1, passenger_object) => {
  return new Promise((resolve, reject) => {
    Passenger_Entity.findOneAndUpdate(query1, passenger_object).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error);
    });
  });
};

exports.updatePassword = (query1, driver_object) => {
  return new Promise((resolve, reject) => {
      Passenger_Entity.findOneAndUpdate(query1, driver_object).then((result) => {
          resolve(result);
      }).catch((error) => {
          reject(error);
      })
  });
};




