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
