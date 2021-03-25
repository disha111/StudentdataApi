const mongoose = require('mongoose');

const schema = mongoose.Schema({
    userName:String,
    userPwd:String
});

module.exports = mongoose.model("info",schema);
