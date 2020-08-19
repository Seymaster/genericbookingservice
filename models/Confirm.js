"use strict"

const mongoose    = require("mongoose");
const Schema      = mongoose.Schema;

const confirmSchema = new Schema({
    bookingId:       {type: String, required: true},
    userId:          {type: String, required: true},
    userEmail:       {type: String, required: true},
    createdAt:       {type: Date, default: Date.now}
});

const Confirm = mongoose.model('Confirm', confirmSchema);

module.exports = Confirm;