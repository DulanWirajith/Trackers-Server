const Owner = require('./../database/Owner');
const Mailer = require('./../../../../../secuirity/Mailer');

// owner registration

exports.ownerRegistration = (req, res, next) => {
  Owner.saveOwner((req.body)).then((registeredOwner) => {
    Mailer.sendMail({
      to: registeredOwner.owner_mail,
      verification: registeredOwner.verification_code
    }).then((result) => {
      res.status(200).json({
        messege: 'owner created',
        id: registeredOwner._id
      });
    }).catch((error) => {
      console.log(error);
      res.status(500).json({
        messege: 'mail sending failed'
      });
    });
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      messege: 'Owner registration failed'
    });
  });
};

// owner login

exports.ownerLogin = (req, res, next) => {
  Owner.searchOwner({
    owner_mail: req.body.owner_mail
  }).then((loggedOwner) => {
    console.log('loggedOwner.password ' + loggedOwner.password);
    if (loggedOwner != null) {
      var encryptedPass;
      loggedOwner.checkPassword(req.body.password).then((isPasswordMatch) => {
        console.log(isPasswordMatch);
        if (isPasswordMatch) {
          Owner.getOwner({
            owner_mail: req.body.owner_mail
          }).then((owner_details) => {
            res.status(200).json({
              messege: 'Owner can log in',
              isUserRight: true,
              ownerID: owner_details._id,
              ownerfirstName: owner_details.first_name,
              ownerlastName: owner_details.last_name,
              ownerMail: owner_details.owner_mail,
              ownerContact: owner_details.contact_no,
              isOwnerVirtify: owner_details.verified
            });
          }).catch((error) => {

          });

        } else {
          res.status(401).json({
            messege: 'Password Mismatch'
          });
        }
      }).catch((error) => {
        res.status(401).json({
          messege: 'Problem in the server. Could not check the password'
        });
      });
    } else {
      console.log('user not found')
      res.status(401).json({
        messege: 'User not found. Invalid Email'
      })
    }
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      messege: 'User Login Failed'
    });
  });
};

// owner update

exports.ownerUpdate = (req, res, next) => {
  Owner.updateOwner({
    owner_mail: req.body.owner_mail
  }, {
    $set: req.body
  }).then((result) => {
    res.status(200).json({
      messege: 'Owner Updated'
    });
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      messege: 'Owner update failed'
    });
  });
};

// get owner
exports.getOwner = (req, res, next) => {
  Owner.getOwner({
    owner_mail: req.body.owner_mail
  }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: result
    });
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      message: 'Get Owner Failed!'
    });
  });
};

// get all owners

exports.getOwners = (req, res, next) => {
  Owner.getAllOwners({}).then((result) => {
    console.log(result);
    res.status(200).json({
      message: result
    });
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      message: 'Get Owner Failed!'
    });
  });
};
