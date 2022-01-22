const {celebrate, Joi} = require('celebrate');
const ObjectId = require('mongoose').Types.ObjectId;


module.exports.createBlog = celebrate({
    body: Joi.object().options({abortEarly: false}).keys({
        title:Joi.string().required(),
        description:Joi.string().required(),
        status:Joi.string().required(),
    })
});

module.exports.deleteBlog = celebrate({
    body: Joi.object().options({abortEarly: false}).keys({
        _id: Joi.string().required().custom((value,helper) =>{
            if(!ObjectId.isValid(value)){
                return helper.message("ID Must be 24 char hex string");
            } else {
                return value;
            }
        })
    })
});