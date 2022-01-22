const Blog = require('../models/user');
const httpStatus = require('http-status-codes').StatusCodes;

module.exports.createBlog= async(req,res) =>{
    try {
        req.body.author = req.user._id;
        let blog = new Blog(req.body);
        return res.send({"status":true,"message":"Blog created successfully","statusCode":httpStatus.OK});
    } catch (error) {
        console.error(error);
        return res.send({"status":false,"message":"Something went wrong","statusCode":httpStatus.INTERNAL_SERVER_ERROR});
    }
};

module.exports.getBlogs = async(req,res) =>{
    try {
        
    } catch (error) {
        console.error(error);
        return res.send({"status":false,"message":"Something went wrong","statusCode":httpStatus.INTERNAL_SERVER_ERROR});
    }
};


module.exports.deleteBlog = async(req,res) =>{
    try {
        
    } catch (error) {
        console.error(error);
        return res.send({"status":false,"message":"Something went wrong","statusCode":httpStatus.INTERNAL_SERVER_ERROR});
    }
};