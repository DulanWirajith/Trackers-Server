const express = require('express');
const router = express.Router();
const passengerController = require('./../services/mobile-applications/passenger-app/controller/PassengerController');
const driverController = require('./../services/mobile-applications/driver-app/controller/DriverController');
const ownerController = require('./../services/admin-portal/controller/OwnerController');
const busesController = require('./../services/admin-portal/controller/BusesController');
const busLocationController = require('./../services/admin-portal/controller/BusLocationController');
const reviewsController = require('./../services/mobile-applications/passenger-app/controller/ReviewsController');
const assignmentController = require('./../services/admin-portal/controller/AssignmentController');

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
router.get('/getowner/:owner_mail', ownerController.getOwner);
router.get('/getallowners', ownerController.getOwners);

// Bus routes

router.post('/busregistration', busesController.busRegistration);
router.put('/updatebus', busesController.busUpdate);
router.get('/getbus/:bus_no', busesController.getBus);
router.get('/getallbuses', busesController.getBuses);

// Real time Bus Location routes

router.post('/savelocation', busLocationController.saveLocations);
router.get('/getlocations', busLocationController.getLocations);
router.get('/getlatestlocation', busLocationController.getLocation);
router.get('/getlatestlocationtoandroid/:bus_no', busLocationController.getLatestLocation);

// Passenger Reviews routes

router.post('/savereviews', reviewsController.saveReviews);
router.put('/updatereview', reviewsController.reviewUpdate);
router.get('/getreview/:passenger_mail', reviewsController.getReview);
router.get('/getallreviews/:passenger_mail', reviewsController.getallReviews);

// Driver and Bus Assignment Routes

router.post('/saveassignment', assignmentController.createAssignment);
router.put('/updateassignment', assignmentController.assignmentUpdate);
router.get('/getassignment', assignmentController.getAssignment);
router.get('/getallassignments', assignmentController.getAssignments);

module.exports = router;
