const express = require('express');
const router= express.Router();
const axios = require('axios')
router.get('/',function(req,res){
    var query=req.query.q;
    console.log(query);
    axios.get(` https://newsapi.org/v2/everything?q=${query}&apiKey=4b2821b99dd64a708f00564be388c26a`)
    .then(function(response){
        if(response.status==200){
           // console.log(response.data.totalResults);
            res.render('headlines',{
               data: response.data.articles
            });
        }
     }); 
});


module.exports=router;