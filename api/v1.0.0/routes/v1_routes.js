const express = require('express');
const router = express.Router();
const passengerController = require('./../services/mobile-applications/passenger-app/controller/PassengerController');
const driverController = require('./../services/mobile-applications/driver-app/controller/DriverController');

// passenger routes
router.post('/registration', passengerController.passengerRegistration);
router.post('/login', passengerController.passengerLogin);
router.put('/modify', passengerController.passengerUpdate);
router.post('/resetpassengerpw', passengerController.forgotPassword);
router.put('/updatepassengerpw', passengerController.passwordUpdate);

// driver routes
router.post('/registerdriver', driverController.driverRegistration);
router.post('/driverlogin', driverController.driverLogin);
router.put('/updatedriver', driverController.driverUpdate);
router.post('/resetdriverpw', driverController.forgotPassword);
router.put('/updatedriverpassword', driverController.passwordUpdate);

module.exports = router;
