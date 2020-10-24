const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const filterroutes=require('./routes/filters');
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.listen('3000',() =>{
    console.log("Server started ");
});
app.use('/filters',filterroutes);
module.exports = app;