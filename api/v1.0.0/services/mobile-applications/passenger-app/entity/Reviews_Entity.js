const mongoose = require('mongoose');

const Reviews_Entity = mongoose.Schema({

    passenger_mail: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    reviewed_date: {
        type: Date,
        required: true
    },
    bus_number: {
        type: String,
        required: true

    },
    driver_discipline: {
        type: Number,
        default: 5
    },
    driver_arrival_time: {
        type: Number,
        default: 5
    },
    bus_condition: {                    // keep it separate or add to the overall score
        type: Number,
        default: 5
    },
    passenger_comment:{
        type:String
    }

});

module.exports = mongoose.model('reviews', Reviews_Entity);
