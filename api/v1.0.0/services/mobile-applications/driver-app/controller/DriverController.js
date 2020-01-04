const Driver = require('./../database/Driver');
const Mailer = require('./../../../../../../secuirity/Mailer');
const encryption = require('./../../../../../../secuirity/Encryption');

// driver registration

exports.driverRegistration = (req, res, next) => {
    Driver.saveDriver((req.body)).then((registeredUser) => {
        Mailer.sendMail({
            to:registeredUser.driver_mail,
            verification: registeredUser.verification_code
        }).then((result) => {
            res.status(200).json({
                message:'user created',
                id: registeredUser._id
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).json({
                message: 'mail sending failed'
            });
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            message: 'user registration error'
        });
    });
};

// driver login

exports.driverLogin = (req, res, next) => {
    Driver.searchDriver({
        driver_mail: req.body.driver_mail
    }).then((loggedDriver) => {
        console.log("LoggedDriver.password : " + loggedDriver.password);
        if (loggedDriver != null) {
            var encryptedPass;
            loggedDriver.checkPassword(req.body.password).then((isPasswordMatch) => {
                console.log(isPasswordMatch);
                if (isPasswordMatch) {
                    res.status(200).json({
                        message: 'Driver can log in'
                    });
                } else {
                    res.status(401).json({
                        message: 'Password mismatch'
                    })
                }
            }).catch((error) => {
                console.log(error);
                res.status(401).json({
                    message: 'Problem in the server. Could not check the password'
                });
            });
        } else {
            console.log('User Not Found');
            res.status(401).json({
                message: 'Authentication Problem. User not identified'
            });
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            message: 'User Login Failed'
        });
    });
};

// driver update

exports.driverUpdate = (req, res, next) => {
    Driver.updateDriver({
        driver_mail: req.body.driver_mail
    },{$set:req.body} ).then((result) => {
        res.status(200).json({
            message: 'Driver Updated'
        });
    }).catch((error) => {
        res.status(500).json({
            message: 'Driver Update Failed'
        });
    });
};

// reset password email send to the user

exports.forgotPassword = (req, res, next) => {
        Driver.searchDriver({
            driver_mail : req.body.driver_mail
        }).then((foundDriver) => {
            if (foundDriver != null) {
               Mailer.sendMail({
                   to:foundDriver.driver_mail,
                  verification:foundDriver.verification_code
               }).then((result) => {
                   res.status(200).json({
                       message: 'Reset Password token sent to the driver'
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
    Driver.updatePassword({
        driver_mail: req.body.driver_mail
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