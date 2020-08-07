"use strict"

const mongoose    = require("mongoose");
const Schema      = mongoose.Schema;

// unique: true
const completeSchema = new Schema({
    bookingId:       {type: String,required: true},
    serviceOptionId: {type: String,required: true},
    paymentRef:      {type: String,required: true},
    createdAt:       {type: String,required: true}
})

const Complete = mongoose.model('Complete', completeSchema);

module.exports = Complete;