const Joi = require('joi');


function vallidateBooking(body){
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        address: Joi.string().required(),
        checkinTime: Joi.date().iso().required(),
        checkoutTime: Joi.date().iso().required().greater(Joi.ref('checkinTime'))
    });
    return schema.validate(body);
}

module.exports = {
    vallidateBooking
}