const Assignments = require('./../database/AssignDriver');

// save assignment

exports.createAssignment = (req, res, next) => {
    Assignments.getAssignment({
      driver_licence_number: req.body.driver_licence_number,
      bus_no: req.body.bus_no,
      date: req.body.date
    }).then((alreadyAddedDriver) => {
      if (alreadyAddedDriver == null) {
        Assignments.saveAssignDriver((req.body)).then((result) => {
          console.log(result);
          console.log('Assignment Added!');
          res.status(200).json({
              messege: 'Assignment Added!'
          });
      }).catch((error) => {
          console.log(error);
          res.status(500).json({
              messege: 'Assignment Failed'
          });
      });
      } else {
        console.log('Already assigned Driver');
        res.status(500).json({
          message: 'You have already assigend this driver. Assignment Failed'
        });
      }
    }).catch((error) => {
      res.status(500).json({
        message: 'Error!'
      });
    });    
};

// update assignment

exports.assignmentUpdate = (req, res, next) => {
    Assignments.updateAssignment({
        assign_id: req.body.assign_id
    }, {$set:req.body} ).then((result) => {
        console.log('Assignment Updated');
        res.status(200).json({
            messege: 'Assignment Updated!'
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            messege: 'Assignment Update Failed!'
        });
    });
};

// get one assignment
exports.getAssignment = (req, res, next) => {
    Assignments.getAssignment({
      assign_id : req.body.assign_id
    }).then((result) => {
      console.log(result);
      res.status(200).json({
        message: result
      });
    }).catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Get one assignment!'
      });
    });
  };
  
  // get all assignments
  
  exports.getAssignments = (req, res, next) => {
    Assignments.getAllAssignments({
    }).then((result) => {
      console.log(result);
      res.status(200).json({
        message: result
      });
    }).catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Get assignments Failed!'
      });
    });
  };
  