const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name:String,
    bookno:Number
})

module.exports = mongoose.model("Book",schema);
