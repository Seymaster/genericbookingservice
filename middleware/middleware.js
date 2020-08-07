const Joi = require("joi");

exports.addmiddleware = (schema, property) =>{
    return (req, res, next) =>{
    const data = schema.validate(req[property]);
    // console.log("got here",data);
    if (!data.error){
        next();
    }
    else {
        const { error } = data;
        const message = error.details[0].message;
        // console.log("error", message);
        res.status(422).json({
            status: 422,
            error: message.replace(/['"]/g,'')});
    }
    }
};