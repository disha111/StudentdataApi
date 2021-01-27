const { Router } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const route = require('./route');

//connect mongoDB
mongoose.connect("mongodb+srv://DJ:Disha123@cluster0.ogawy.mongodb.net/students?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true}).then(
    ()=>{
        const app = express();
        app.use("/api",route);
        app.listen(process.env.PORT || 3750,()=>{
            console.log("Server started...!");
        })
    }
)
