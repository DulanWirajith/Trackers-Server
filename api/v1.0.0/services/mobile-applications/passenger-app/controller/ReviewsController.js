const Reviews = require('./../database/Reviews');

// save reviews

exports.saveReviews = (req, res, next) => {
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
};

// review update

exports.reviewUpdate = (req, res, next) => {
    Reviews.updateReview({
        passenger_mail: req.body.passenger_mail
    }, {$set:req.body} ).then((result) => {
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
        passenger_mail : req.body.passenger_mail
    }).then((result) => {
      console.log(result);
      res.status(200).json({
        message: result
      });
    }).catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Get Review Failed!'
      });
    });
  };

// get all reviews

exports.getallReviews = (req, res, next) => {
    Reviews.getAllReviews({}).then((result) => {
        console.log(result);
        res.status(200).json({
            messege: result
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            messege: 'Get all reviews failed!'
        });
    });
};