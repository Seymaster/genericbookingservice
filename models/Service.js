"use strict"

const mongoose    = require("mongoose");
const Schema      = mongoose.Schema;

const optionSchema = Schema({
    label       : {type: String,required: true, unique: true},
    amount      : {type: Number,required: true},
    default     : {type: Boolean,default: false},
    product_id  : {type: String, required: false, default: null}
});

const serviceSchema = Schema({
    name:           {type: String,required: true},
    options:        [optionSchema],
    dateCreated:    {type:Date,default:Date.now},
    dateModified:   {type:Date}
    });

const Service = mongoose.model('Service',serviceSchema);

module.exports = Service;