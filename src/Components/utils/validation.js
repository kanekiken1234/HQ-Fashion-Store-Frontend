const Joi = require('joi');

function validate(user) {
    const schema = Joi.object({
        firstname: Joi.string().max(50).required(),
        lastname: Joi.string().max(50).required(),
        email: Joi.string().max(255).required().email({ tlds: { allow: false } }),
        password: Joi.string().max(255).required(),
    })
    const validationResponse = schema.validate(user);
    return validationResponse;
}

function validationLogin(user) {
    const loginSchema = Joi.object({
        email: Joi.string().max(255).required().email({ tlds: { allow: false } }),
        password: Joi.string().max(255).required(),
    })

    const validationResponse = loginSchema.validate(user);
    return validationResponse;
}

module.exports.validate = validate;
module.exports.validationLogin = validationLogin;