const Joi = require('joi');

const contactValidation = (data) => {
    const contactSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email()
    });

    return contactSchema.validate(data);
}

const userValidation = (data) => {
    const userSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    });

    return userSchema.validate(data);
}

module.exports.contactValidation = contactValidation;
module.exports.userValidation = userValidation;