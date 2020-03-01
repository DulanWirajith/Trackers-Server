const mongoose = require('mongoose');
const encryption = require('./../../../../../secuirity/Encryption');
const randomToken = require('rand-token').generator({
  chars: '0-9'
});

const Owner_Entity = mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    owner_mail: {
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
    date_of_birth: {
        type: String
    },
    contact_no: {
        type: Number
    },
    blocked: {
        type: Boolean,
        default: false
    },
    created_at: {
      type: Date,
      default: new Date()
    },
    address:{
      type: String
    }

});

// password encrypt karana eka
Owner_Entity.pre('save', function(next) {
    // console.log("pre is running");
    var owner = this;
    if (!owner.isModified('password')) {
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


  Owner_Entity.methods.checkPassword = function(userPassword) {
    return new Promise((resolve, reject) => {
      encryption.decryptPassword(userPassword, this.password).then((authenticate) => {
        resolve(authenticate);
      }).catch(error => {
        reject(error);
      });
    })
  };

module.exports = mongoose.model('owner', Owner_Entity);
