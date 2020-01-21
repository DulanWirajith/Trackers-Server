const mongoose = require('mongoose');

const Bus_Realtime_Location = mongoose.Schema({
    bus_no: {
        type: String,
        required: true,
        unique: true,
    },
    driver_mail: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
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
    },
    overall_driver_score: {
        type: Number,
        default: 100
    },
    weather: {
        type: String,
        timestamps: true
    },
    road_condition: {
        type: String,
        timestamps: true
    }
    // date: {
    //     type: Date,
    //     required: true,
    //     unique: true
    // },

});

module.exports = mongoose.model('locations', Bus_Realtime_Location);
