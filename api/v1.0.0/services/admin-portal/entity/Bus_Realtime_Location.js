const mongoose = require('mongoose');

const Bus_Realtime_Location = mongoose.Schema({
    bus_no: {
        type: String,
        required: true
    },
    current_location: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    },    
    distance: {
        type: Number
    },
    speed_of_bus: {
        type: Number,
        timestamps: true
    },
    weather: {
        type: String,
        timestamps: true
    },
    road_condition: {
        type: String,
        timestamps: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    bus_time: {
        type: Date
    },
    time_duration: {
        type: String
    },

});

module.exports = mongoose.model('locations', Bus_Realtime_Location);
