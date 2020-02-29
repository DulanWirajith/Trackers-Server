const Reviews = require('./../database/Reviews');

// save reviews

exports.saveReviews = (req, res, next) => {
  Reviews.getReview({
    passenger_mail: req.body.passenger_mail,
    bus_number: req.body.bus_number,
    reviewed_date: req.body.reviewed_date,
  }).then((alreadyAddedReview)=>{
    if (alreadyAddedReview==null) {
      Reviews.saveReviews((req.body)).then((result) => {
        console.log('Review Added!');
        res.status(200).json({
          messege: 'Review Added!'
        });
      }).catch((error) => {
        console.log(error);
        res.status(500).json({
          messege: 'Review Added Failed'
        });
      });
    }else{
      console.log("already added review");
      res.status(500).json({
        messege: 'You already added a review. Review Added Failed'
      });
    }
  }).catch((error)=>{

  });
};

// review update

exports.reviewUpdate = (req, res, next) => {
  Reviews.updateReview({
    passenger_mail: req.body.passenger_mail
  }, {
    $set: req.body
  }).then((result) => {
    console.log('Review Updated');
    res.status(200).json({
      messege: 'Review Updated!'
    });
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      messege: 'Review Update Failed!'
    });
  });
};

// get one review
exports.getReview = (req, res, next) => {
  Reviews.getReview({
    passenger_mail: req.params.passenger_mail
  }).then((result) => {
    console.log(result);
    res.status(200).json({
      bus_number: result.bus_number
    });
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      reviews: 'Get Review Failed!'
    });
  });
};

// get all reviews

exports.getallReviews = (req, res, next) => {
  Reviews.getAllReviews({
    passenger_mail: req.params.passenger_mail
  }).then((result) => {
    console.log(result);
    res.status(200).json({
      reviews: result
    });
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      message: 'Get all reviews failed!'
    });
  });
};
