const mongoose = require('mongoose');

const Bus_Entity = mongoose.Schema({
    bus_no: {
        type: String,
        required: true,
        unique: true,
    },
    route: {
        type: String
    },
    route_no: {
        type: String
    },   
    bus_type: {
        type: String
    },
    owner_mail: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    location: {
        type: String
    },
    created_at: {
      type: Date,
      default: new Date()
    }
});

module.exports = mongoose.model('buses', Bus_Entity);