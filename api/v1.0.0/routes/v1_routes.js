const express = require('express');
const router = express.Router();
const passengerController = require('./../services/mobile-applications/passenger-app/controller/PassengerController');
const driverController = require('./../services/mobile-applications/driver-app/controller/DriverController');
const ownerController = require('./../services/admin-portal/controller/OwnerController');
const busesController = require('./../services/admin-portal/controller/BusesController');

// passenger routes
router.post('/registration', passengerController.passengerRegistration);
router.post('/login', passengerController.passengerLogin);
router.put('/modify', passengerController.passengerUpdate);
router.post('/resetpassengerpw', passengerController.forgotPassword);
router.put('/updatepassengerpw', passengerController.passwordUpdate);
router.get('/getpassenger', passengerController.getPassenger);
router.get('/getallpassengers', passengerController.getPassengers);

// driver routes
router.post('/registerdriver', driverController.driverRegistration);
router.post('/driverlogin', driverController.driverLogin);
router.put('/updatedriver', driverController.driverUpdate);
router.post('/resetdriverpw', driverController.forgotPassword);
router.put('/updatedriverpassword', driverController.passwordUpdate);
router.get('/getdriver', driverController.getDriver);
router.get('/getalldrivers', driverController.getDrivers);

// owner routes

router.post('/registerowner', ownerController.ownerRegistration);
router.post('/ownerlogin', ownerController.ownerLogin);
router.put('/ownerupdate', ownerController.ownerUpdate);
router.get('/getowner', ownerController.getOwner);
router.get('/getallowners', ownerController.getOwners);

// Bus routes

router.post('/busregistration', busesController.busRegistration);
router.put('/updatebus', busesController.busUpdate);
router.get('/getbus', busesController.getBus);
router.get('/getallbuses', busesController.getBuses);

module.exports = router;
