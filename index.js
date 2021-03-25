const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const route = require('./route');
const cors = require('cors');

//connect mongoDB
mongoose.connect("mongodb+srv://DJ:Disha123@cluster0.ogawy.mongodb.net/students?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true}).then(
    ()=>{
        const app = express();
        app.use(cors);
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(express.json());
        app.use("/api",route);
        app.listen(process.env.PORT || 3000,()=>{
            console.log("Server started...!");
        })
    }
)
