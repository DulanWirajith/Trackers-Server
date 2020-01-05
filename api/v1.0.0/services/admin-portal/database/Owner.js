const Owner_Entity = require('./../../admin-portal/entity/Owner_Entity');
const mongoose = require('mongoose');

exports.saveOwner = (owner_object) => {
    return new Promise((resolve, reject) => {
        Owner_Entity.create(owner_object).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });        
    });
};

exports.searchOwner = (owner_mail) => {
    return new Promise((resolve, reject) => {
        Owner_Entity.findOne(owner_mail).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};

exports.getOwner = (query1) => {
    return new Promise((resolve, reject) => {
      Owner_Entity.findOne(query1).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  };
  
  exports.getAllOwners = () => {
    return new Promise((resolve, reject) => {
      Owner_Entity.find({}).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  };

exports.updateOwner = (query1, owner_object) => {
    return new Promise((resolve, reject) => {
        Owner_Entity.findOneAndUpdate(query1, owner_object).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};