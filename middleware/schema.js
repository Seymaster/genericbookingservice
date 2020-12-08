const Joi = require("joi");

exports.serviceSchema = {
    servicePost: Joi.object().keys({
        name: Joi.string().trim().required()
    })
};

exports.bookingSchema = {
    bookingPost: Joi.object().keys({
        service: Joi.string().required()
    })
};

exports.completeSchema = {
    completePost: Joi.object().keys({
        bookingId: Joi.string().trim().required(),
        serviceOptionId: Joi.string().trim().required(),
        paymentRef: Joi.string().trim().required()
    })
};

exports.confirmSchema = {
    confirmPost: Joi.object().keys({
        bookingId: Joi.string().trim().required(),
        userId:    Joi.string().trim().required(),
        userEmail: Joi.string().trim().email().required()
    })
}
