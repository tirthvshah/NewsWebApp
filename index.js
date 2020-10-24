const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const Searchroutes=require('./routes/search');
app.use(bodyParser.json());
app.listen('3000',() =>{
    console.log("Server started ");
});
app.use('/search',Searchroutes);
module.exports = app;