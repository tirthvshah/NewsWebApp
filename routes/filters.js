const express=require('express');
const routes=express.Router();
const axios = require('axios');
const { response } = require('..');
routes.get('/country/:query',function(req,res){
    var query=req.params.query;
    axios.get(`https://newsapi.org/v2/top-headlines?country=${query}&apiKey=4b2821b99dd64a708f00564be388c26a`)
    .then(function(response){
        if(response.status==200){
            //console.log(response.data);
            res.render('filter',{
                data:response.data
            });
        }
     }); 
     

});

routes.get('/category/:query',function(req,res){
    var query=req.params.query;
   
    axios.get(` https://newsapi.org/v2/top-headlines?category=${query}&apiKey=4b2821b99dd64a708f00564be388c26a`)
    .then(function(response){
        if(response.status==200){
            console.log(response.data);
            res.render('filter',{
                data:response.data
            });
        }
     }); 
     

});
module.exports=routes;