const mongoose = require('mongoose');

const studschema = mongoose.Schema({
    name:String,
    rno:String,
    email:String,
    pass:String,
    gen:String,
    dob:String,
    branch:String
});

module.exports = mongoose.model("Studentdata",studschema);