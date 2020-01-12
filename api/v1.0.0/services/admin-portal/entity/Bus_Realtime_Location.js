const mongoose = require('mongoose');

const Bus_Realtime_Location = mongoose.Schema({
    bus_no: {
        type: String,
        required: true,
        unique: true,
    },
    longitude: {
        type: Number,
        required: true,
        timestamps: true
    },
    latitude: {
        type: Number,
        required: true,
        timestamps: true
    },
    speed_of_bus: {
        type: Number,
        timestamps: true
    }
    // date: {
    //     type: Date,
    //     required: true,
    //     unique: true
    // },

});

module.exports = mongoose.model('locations', Bus_Realtime_Location);
