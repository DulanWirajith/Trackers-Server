const mongoose = require('mongoose');

const AssignDriverEntity = mongoose.Schema({
    bus_owner_mail: {
        type: String,
        required: true,
    },
    driver_mail: {
        type: String,
        required: true,
    },
    bus_no: {
        type: String,
        required: true,
        unique: true,
    },
    overall_driver_score: {
        type: Number,
        default: 100
    },

})

module.exports = mongoose.model('assigndriver', AssignDriverEntity);