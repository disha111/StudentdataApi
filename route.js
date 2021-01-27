const express = require('express');
const StudentData = require('./Model/studentdata');
const bookdata = require('./Model/book');

const router = express.Router();

router.get("/studentData",async (req,res)=>{
     const student = await StudentData.find();
     res.send(student);
});

router.get("/bookdata",async (req,res)=>{
     const book = await bookdata.find();
     res.send(book);
});
module.exports = router;