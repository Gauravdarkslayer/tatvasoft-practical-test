const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user');

module.exports.auth = async(req,res,next) => {
    try {
        if(req.header('Authorization')){
            const token = req.header('Authorization').replace('Bearer ','');
            const data = jwt.verify(token, config.secretKey);
            const user = await User.findOne({email: data.email});
            if(user){
                req.user = user;
                req.token = token;
                next();
            } else {
                throw new Error();
            }
        } else {
            throw new Error();
        }
    } catch (error) {
        res.status(401).send({ "statusCode":401, message: 'Not authorized to access this resource'});
    }
};