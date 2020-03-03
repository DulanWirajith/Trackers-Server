const Buses = require('./../database/Buses');

// Bus Registration

exports.busRegistration = (req, res, next) => {
    Buses.saveBus((req.body)).then((result) => {
        console.log('Bus Addded');
        res.status(200).json({
            messege: 'Bus Added!'
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            messege: 'Bus Registration Failed'
        });
    });
};

// bus update

exports.busUpdate = (req, res, next) => {
    Buses.updateBus({
        bus_no: req.body.bus_no
    }, {$set:req.body} ).then((result) => {
        console.log('Bus Updated');
        res.status(200).json({
            messege: 'Bus Updated!'
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            messege: 'Bus Update Failed!'
        });
    });
};

// get one bus
exports.getBus = (req, res, next) => {
  console.log(req.params.bus_no);
    Buses.getBus({
      bus_no : req.params.bus_no
    }).then((result) => {
      console.log(result);
      res.status(200).json({
        message: result
      });
    }).catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Get Bus Failed!'
      });
    });
  };
  
  // get all buses
  
  exports.getBuses = (req, res, next) => {
    Buses.getAllBuses({
    }).then((result) => {
      console.log(result);
      res.status(200).json({
        message: result
      });
    }).catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Get Buses Failed!'
      });
    });
  };
  