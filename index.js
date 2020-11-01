const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const filterroutes=require('./routes/filters');
const Headlineroute = require('./routes/headline')
app.use(bodyParser.json());
app.set('view engine', 'ejs');


// app.use('/search',Searchroutes);
app.use('/headlines',Headlineroute)
app.get('/',(req,res)=>{
    res.redirect('/headlines')
})
app.listen('3000',() =>{
    console.log("Server started ");
});

app.use(express.static(__dirname + "/public"))
app.use('/filters',filterroutes);
module.exports = app;