const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name:String,
    rollNo:Number,
    field:String
})

module.exports = mongoose.model("info",schema);
