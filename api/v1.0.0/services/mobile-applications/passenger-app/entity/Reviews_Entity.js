const mongoose = require('mongoose');

const Reviews_Entity = mongoose.Schema({
    passenger_mail: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    driver_discipline: {
        type: Number,
        default: 100
    },
    driver_arrival_time: {
        type: Number,
        default: 100
    },
    bus_condition: {                    // keep it separate or add to the overall score
        type: Number
    }
});

module.exports = mongoose.model('reviews', Reviews_Entity);