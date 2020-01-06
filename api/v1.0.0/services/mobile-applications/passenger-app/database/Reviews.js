const Reviews_Entity = require('./../entity/Reviews_Entity');
const mongoose = require('mongoose');

exports.saveReviews = (reviews_object) => {
    return new Promise((resolve, reject) => {
        Reviews_Entity.create((reviews_object)).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};

exports.getReview = (query1) => {
    return new Promise((resolve, reject) => {
      Reviews_Entity.findOne(query1).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  };
  
exports.getAllReviews = () => {
    return new Promise((resolve, reject) => {
      Reviews_Entity.find({}).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  };

exports.updateReview = (query1, review_object) => {
    return new Promise((resolve, reject) => {
        Reviews_Entity.findOneAndUpdate(query1, review_object).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};