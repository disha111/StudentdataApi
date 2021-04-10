const mongoose = require('mongoose');

const video_schema = mongoose.Schema({
    title: {
        type:String,
        required:true},
    desc:{
        type:String,
        required:true},
    posted_by:String,
    url:{
        type:String,
        required:true},
    likes:String,
    cat:String
},{timestamps:true});

module.exports = mongoose.model("Video",video_schema);
