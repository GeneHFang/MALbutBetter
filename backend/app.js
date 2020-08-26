//require/imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('./env');

//Routes
app.get('/', (request, response)=>{

});


//DB connection
mongoose.connect(env.DBCONNECTION, ()=>console.log("db connection successful"));

app.listen(3000);