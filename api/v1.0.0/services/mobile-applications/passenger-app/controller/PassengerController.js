const Passenger = require('./../database/Passenger');
const Mailer = require('./../../../../../../secuirity/Mailer');


//passenger registration
exports.passengerRegistration = (req, res, next) => {
  Passenger.savePassenger((req.body)).then((registeredUser) => {
    Mailer.sendMail({
      to: registeredUser.passenger_mail,
      verification: registeredUser.verification_code
    }).then(result => {
      console.log('user created.. user id :' + registeredUser._id);
      res.status(200).json({
        message: 'user created',
        id: registeredUser._id
      });
    }).catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'mail sending failed',
        id: 'hey'
      });
    });
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      message: 'sudu mahaththaya user registration eke aulak..',
      id: 'hey'
    });
  });
};

// passenger login
exports.passengerLogin = (req, res, next) => {
  console.log(req.body.passenger_mail);
  console.log(req.body.password);

  Passenger.searchPassenger({
    passenger_mail: req.body.passenger_mail
  }).then((loggedPassenger) => {
    console.log("loggedPassenger.password : " + loggedPassenger.password);
    if (loggedPassenger != null) {
      var encryptedPass;
      loggedPassenger.checkPassword(req.body.password).then((isPasswordMatch) => {
        console.log(isPasswordMatch);
        if (isPasswordMatch) {
          Passenger.getPassenger({
            passenger_mail: req.body.passenger_mail
          }).then((passenger_details)=>{
            res.status(200).json({
              message: 'Sudu mahaththaya Passenger ta log wenna denna...',
              isUserRight : true,
              passengerID:passenger_details._id,
              passengerFirstName:passenger_details.first_name,
              passengerLastName:passenger_details.last_name,
              passengerMail:passenger_details.passenger_mail,
              passengerContact:passenger_details.contact_no,
              passengerIsVirtify:passenger_details.verified



            });
          }).catch((error)=>{

          });
          
        } else {
          res.status(401).json({
            message: 'Sudu mahaththaya password match wenne nee...',
            isUserRight : false
          });
        }
      }).catch((error) => {
        console.log(error);
        res.status(401).json({
          message: 'Sudu mahaththaya server eke aulak. password check karanna une nee...',
          isUserRight : false
        });
      });

    } else {
      console.log("user not found");
      res.status(401).json({
        message: 'sudu mahaththaya Authantication failed. User kenek eththe nee',
        isUserRight : false
      });
    }
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      message: 'sudu mahaththaya user login eke aulak..',
      isUserRight : false
    });
  });
};


// passenger update
exports.passengerUpdate = (req, res, next) => {
  Passenger.updatePassenger({
    passenger_mail: req.body.passenger_mail
  }, {
    $set: req.body
  }).then((result) => {
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
    passenger_mail: req.params.passenger_mail
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
  Passenger.getAllPassengers({}).then((result) => {
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
    passenger_mail: req.body.passenger_mail
  }).then((foundPassenger) => {
    if (foundPassenger != null) {
      Mailer.sendMail({
        to: foundPassenger.passenger_mail,
        verification: foundPassenger.verification_code
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
  }, {
    $set: req.body
  }).then((result) => {
    res.status(200).json({
      message: 'Password Updated'
    });
  }).catch((error) => {
    res.status(500).json({
      message: 'Password Update Failed'
    });
  });
};
