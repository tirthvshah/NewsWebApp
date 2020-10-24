const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const Searchroutes=require('./routes/search');
const Headlineroute = require('./routes/headline')

app.use(bodyParser.json());
app.set('view engine', 'ejs');


app.use('/search',Searchroutes);
app.use('/headlines',Headlineroute)
app.get('/',(req,res)=>{
    res.redirect('/headlines')
})
app.listen('3000',() =>{
    console.log("Server started ");
});

module.exports = app;