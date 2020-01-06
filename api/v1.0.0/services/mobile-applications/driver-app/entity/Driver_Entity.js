const mongoose = require('mongoose');
const encryption = require('./../../../../../../secuirity/Encryption');

const randomToken = require('rand-token').generator({
    chars: '0-9'
  });

const Driver_Entity = mongoose.Schema({
    // account_type: { type: String },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  // business_name: { type: String },
  licence_number: {
    type:String,
    required: true,
    unique: true
},
  driver_mail: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  gender: {
    type: String
  },
  password: {
    type: String
  },
  verification_code: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  // verification_end: { type: Date, default: new Date(+new Date() + 30 * 24 * 60 * 60 * 1000) },
  // promotion_code: { type: String },
  birthday: {
    type: String
  },
  driver_age: {
    type: Number
  },
  contact_no: {
    type: String
  },
  overall_driver_score: {
    type: Number,
    default: 100
  },
  blocked: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: new Date()
  }
});


// password encrypt karana eka
Driver_Entity.pre('save', function(next) {
    // console.log("pre is running");
    var passenger = this;
    if (!passenger.isModified('password')) {
      return next();
    }
    encryption.encryptPassword(this.password).then((encryptedPassword) => {
      this.password = encryptedPassword;
      this.verification_code = randomToken.generate(4);
      next();
    }).catch(error => {
      throw new Error(error);
      next();
    });
  });
  
  
  Driver_Entity.methods.checkPassword = function(userPassword) {
    return new Promise((resolve, reject) => {
      encryption.decryptPassword(userPassword, this.password).then((authenticate) => {
        resolve(authenticate);
      }).catch(error => {
        reject(error);
      });
    })
  };
  
  
  module.exports = mongoose.model('driver', Driver_Entity);
  