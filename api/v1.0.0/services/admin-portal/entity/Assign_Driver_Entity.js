const mongoose = require('mongoose');

const AssignDriverEntity = mongoose.Schema({
    driver_licence_number: {
        type: String,
        required: true,
        unique: true
    },
    bus_no: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        required: true,
        unique: true
    }

})

module.exports = mongoose.model('assigndriver', AssignDriverEntity);