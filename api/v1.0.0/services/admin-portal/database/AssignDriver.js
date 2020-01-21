const Assign_Driver_Entity = require('./../entity/Assign_Driver_Entity');
const mongoose = require('mongoose');

exports.saveAssignDriver = (assign_object) => {
    return new Promise((resolve, reject) => {
        Assign_Driver_Entity.create(assign_object).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
};

exports.searchAssignment = (assign_id) => {
    return new Promise((resolve, reject) => {
        Assign_Driver_Entity.findOne(assign_id).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
};

exports.getAssignment = (query1) => {
    return new Promise((resolve, reject) => {
      Assign_Driver_Entity.findOne(query1).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
};

exports.getAllAssignments = () => {
    return new Promise((resolve, reject) => {
      Assign_Driver_Entity.find({}).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  exports.updateAssignment = (query1, bus_object) => {
    return new Promise((resolve, reject) => {
        Assign_Driver_Entity.findOneAndUpdate(query1, bus_object).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};

