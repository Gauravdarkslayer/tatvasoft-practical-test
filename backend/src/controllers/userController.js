const User = require('../models/user');
const httpStatus = require('http-status-codes').StatusCodes;

module.exports.signup = async(req,res) =>{
    try {
        const { firstname,lastname,email,dob,role,password } = req.body;
        let user = await User.findOne({email});
        if(user){
           return res.send({"status":false,"message":"User already exist","statusCode":httpStatus.UNAUTHORIZED});
        } else {
            let newUser =  new User({firstname,lastname,email,dob,role});
            newUser.setPassword(password);
            await newUser.save();
            return res.send({"status":true,"message":"Account created successfully","statusCode":httpStatus.OK});
        }
    } catch (error) {
        console.error(error);
       return res.send({"status":false,"message":"Something went wrong","statusCode":httpStatus.INTERNAL_SERVER_ERROR});
    }
};

module.exports.login = async(req,res) =>{
    try {
        const {email,password,role} = req.body;
        let user = await User.findOne({email});
        if(user && user.role === role){
            if(user.validPassword(password)){
                let jwt = user.generateJwt();
                let userData = { accessToken:jwt };
               return res.send({"status":true,"message":"Logged in successfully","data":userData,"statusCode":httpStatus.OK});
            } else {
               return res.send({"status":false,"message":"Invalid credentials","statusCode":httpStatus.UNAUTHORIZED});
            }
        } else {
           return res.send({"status":false,"message":"User Not Found","statusCode":httpStatus.UNAUTHORIZED});
        }
    } catch (error) {
        console.error(error);
       return res.send({"status":false,"message":"Something went wrong","statusCode":httpStatus.INTERNAL_SERVER_ERROR});
    }
};