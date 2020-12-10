"use strict"

const mongoose    = require("mongoose");
const Schema      = mongoose.Schema;

const bookingSchema = new Schema({
    address:        {type: String,required: true},
    nextOfKin:      {type: String,required: true},
    userId:         {type: String, required: false},
    status:         {type: String,required: false, default: "PENDING"},
    service:        {type: Object,required: true},
    createdAt:      {type: Date, default: Date.now},
    updatedAt:      {type: Date}
})

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;