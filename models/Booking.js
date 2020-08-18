"use strict"

const mongoose    = require("mongoose");
const { required } = require("joi");
const Schema      = mongoose.Schema;

const bookingSchema = new Schema({
    address:        {type: String,required: true},
    nextOfKin:      {type: String,required: true},
    status:         {type: String,required: false, default: "PENDING"},
    services:       [{type: Schema.Types.ObjectId, ref: "Service",required: true}],
    userId:         {type: Schema.Types.ObjectId, ref: "User"},
    createdAt:      {type: Date, default: Date.now},
    updatedAt:      {type: Date}
})

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;