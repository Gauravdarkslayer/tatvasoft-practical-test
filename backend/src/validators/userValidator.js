const {celebrate, Joi} = require('celebrate');

module.exports.register = celebrate({
    body: Joi.object().options({abortEarly: false}).keys({
        firstname:Joi.string().required(),
        lastname:Joi.string().required(),
        email:Joi.string().required(),
        password:Joi.string().required(),
        dob:Joi.string().required(),
        role:Joi.string().required(),
    })
});


module.exports.login = celebrate({
    body: Joi.object().options({abortEarly: false}).keys({
        email:Joi.string().required(),
        password:Joi.string().required(),
        role:Joi.string().required(),
    })
});
