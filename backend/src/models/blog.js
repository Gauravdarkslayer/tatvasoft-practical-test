const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    date:{type:Date},
    status:{enum:['active','inactive']},
})

module.exports = mongoose.model('blog',blogSchema);