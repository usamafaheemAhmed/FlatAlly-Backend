const Joi = require("joi");

const usersSchema = (users) => {
    const schema = Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string(),
        gender: Joi.string(),
        phone: Joi.string(),
    });
    return schema.validate(users);
};

module.exports = usersSchema;
