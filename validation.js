const Joi = require('joi');

const contactValidation = (data) => {
    const contactSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email()
    });

    return contactSchema.validate(data);
}

module.exports.contactValidation = contactValidation;