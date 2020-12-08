'use strict';

const jwt = require('jsonwebtoken');
const Joi = require("joi");


exports.verifyJWT = (payload, key) => {
    // console.log(payload, "key", key, "default", process.env.DEFAULT_SECURITY_KEY);
    return jwt.verify(payload, key || process.env.DEFAULT_SECURITY_KEY);
};

exports.validate = (schema, property) =>{
    return (req, res, next) =>{
        const data = schema.validate(req[property]);
        if (!data.error){
            next();
        }
        else {
            const { error } = data;
            const message = error.details[0].message;
            res.status(422).json({
                status: 422,
                error: message.replace(/['"]/g,'')});
        }
    }
};