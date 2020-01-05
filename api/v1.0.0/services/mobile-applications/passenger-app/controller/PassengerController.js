const Passenger = require('./../database/Passenger');
const Mailer = require('./../../../../../../secuirity/Mailer');


//passenger registration
exports.passengerRegistration = (req, res, next) => {
  Passenger.savePassenger((req.body)).then((registeredUser) => {
    Mailer.sendMail({
      to: registeredUser.passenger_mail,
      verification: registeredUser.verification_code
    }).then(result => {
      res.status(200).json({
        message: 'user created',
        id: registeredUser._id
      });
    }).catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'mail sending failed'
      });
    });
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      message: 'sudu mahaththaya user registration eke aulak..'
    });
  });  
};

// passenger login
exports.passengerLogin = (req, res, next) => {
  Passenger.searchPassenger({
    passenger_mail: req.body.passenger_mail
  }).then((loggedPassenger) => {
    console.log("loggedPassenger.password : " + loggedPassenger.password);
    if (loggedPassenger != null) {
      var encryptedPass;
      loggedPassenger.checkPassword(req.body.password).then((isPasswordMatch) => {
        console.log(isPasswordMatch);
        if (isPasswordMatch) {
          res.status(200).json({
            message: 'Sudu mahaththaya Passenger ta log wenna denna...'
          });
        } else {
          res.status(401).json({
            message: 'Sudu mahaththaya password match wenne nee...'
          });
        }
      }).catch((error) => {
        console.log(error);
        res.status(401).json({
          message: 'Sudu mahaththaya server eke aulak. password check karanna une nee...'
        });
      });

    } else {
      console.log("user not found");
      res.status(401).json({
        message: 'sudu mahaththaya Authantication failed. User kenek eththe nee'
      });
    }
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      message: 'sudu mahaththaya user login eke aulak..'
    });
  });
};

// passenger update
exports.passengerUpdate = (req, res, next) => {
  Passenger.updatePassenger({
    passenger_mail: req.body.passenger_mail
  },{$set:req.body} ).then((result) => {
    res.status(200).json({
      message: 'Passenger Updated'
    });
  }).catch((error) => {
    res.status(500).json({
      message: 'Passenger Update failed'
    });
  });
};

// get passenger
exports.getPassenger = (req, res, next) => {
  Passenger.getPassenger({
    passenger_mail : req.body.passenger_mail
  }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: result
    });
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      message: 'Get Passenger Failed!'
    });
  });
};

// get all passengers

exports.getPassengers = (req, res, next) => {
  Passenger.getAllPassengers({
  }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: result
    });
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      message: 'Get Passenger Failed!'
    });
  });
};

// passenger password reset send mail to the user

exports.forgotPassword = (req, res, next) => {
  Passenger.searchPassenger({
      passenger_mail : req.body.passenger_mail
  }).then((foundPassenger) => {
      if (foundPassenger != null) {
         Mailer.sendMail({
             to:foundPassenger.passenger_mail,
            verification:foundPassenger.verification_code
         }).then((result) => {
             res.status(200).json({
                 message: 'Reset Password token sent to the Passenger'
             });
         }).catch((error) => {
             res.status(500).json({
                 message: 'Reset Password Failed'
             });
         });
      } else {
          console.log('User not found!');
          res.status(401).json({
              message: 'User Not Found!'
          });
      }
  });
};

// update password

exports.passwordUpdate = (req, res, next) => {
Passenger.updatePassword({
  passenger_mail: req.body.passenger_mail
},{$set:req.body} ).then((result) => {
      res.status(200).json({
          message: 'Password Updated'
      });
}).catch((error) => {
  res.status(500).json({
      message: 'Password Update Failed'
  });
});
};

