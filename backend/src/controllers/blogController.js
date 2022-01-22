const Blog = require('../models/blog');
const httpStatus = require('http-status-codes').StatusCodes;

module.exports.createBlog= async(req,res) =>{
    try {
        req.body.author = req.user._id;
        let blog = new Blog(req.body);
        await blog.save();
        return res.send({"status":true,"message":"Blog created successfully","statusCode":httpStatus.OK,"data":blog});
    } catch (error) {
        console.error(error);
        return res.send({"status":false,"message":"Something went wrong","statusCode":httpStatus.INTERNAL_SERVER_ERROR});
    }
};

module.exports.getBlogs = async(req,res) =>{
    try {
        let blogs;
        if(req.user.role === 'admin'){
            blogs = await Blog.find({});
        } else {
            blogs = await Blog.find({author:req.user._id});
        }
        return res.send({"status":true,"statusCode":httpStatus.OK,"data":blogs});
    } catch (error) {
        console.error(error);
        return res.send({"status":false,"message":"Something went wrong","statusCode":httpStatus.INTERNAL_SERVER_ERROR});
    }
};


module.exports.deleteBlog = async(req,res) =>{
    try {
        let blog = await Blog.findOne({_id:req.query._id});
        if(blog){
            await Blog.deleteOne({_id:req.query._id});
            return res.send({"status":true,"message":"Blog deleted successfully","statusCode":httpStatus.OK});
        } else {
            return res.send({"status":true,"message":"Blog not found","statusCode":httpStatus.BAD_REQUEST});
        }
    } catch (error) {
        console.error(error);
        return res.send({"status":false,"message":"Something went wrong","statusCode":httpStatus.INTERNAL_SERVER_ERROR});
    }
};