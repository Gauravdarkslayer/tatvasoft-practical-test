const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); 
const config = require('../config/config');

const userSchema = new mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String,unique:true},
    hash:{type:String},
    salt:{type:String},
    dob:{type:Date},
    role:{type:String}
});


userSchema.methods.generateJwt = function (){
    return jwt.sign({_id: this._id},config.secretKey);
};

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password,this.salt,10000,512,'sha512').toString('hex');
};

userSchema.methods.validPassword =function (password) {
    let hash = crypto.pbkdf2Sync(password,this.salt,10000,512,'sha512').toString('hex');
    return this.hash === hash;
};

module.exports = mongoose.model('user',userSchema);