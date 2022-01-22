const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    author:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title:{type:String},
    description:{type:String},
    date:{type:Date},
    status:{type:String},
})

module.exports = mongoose.model('blog',blogSchema);