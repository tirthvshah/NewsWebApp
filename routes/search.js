const express = require('express');
const router= express.Router();
const axios = require('axios')

const API_KEY = process.env.API_KEY
router.get('/',function(req,res){
    var query=req.query.q;
   /*  console.log(query); */
    axios.get(` https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`)
    .then(function(response){
        if(response.status==200){
          console.log('arey waah asani se hogaya yeh toh')
         /* console.log(response.data.articles.length); */
         var fullUrl = req.originalUrl.split('&page');
       /*   console.log(fullUrl); */
         var page = parseInt(req.query.page)
         const limit = parseInt(5)
         if(isNaN(page)){
             page=1
         }
         const startIndex = (page - 1) * limit
         const endIndex = page * limit
     
         const results = {}
     
         if (endIndex < response.data.articles.length) {
           results.next = {
             page: page + 1,
             limit: limit
           }
         }
         
         if (startIndex > 0) {
           results.previous = {
             page: page - 1,
             limit: limit
           }
         }
         results.origin={
            url:fullUrl[0]
         }
       /*   console.log(results); */
         try {
           results.results = response.data.articles.slice(startIndex,endIndex)
           res.render('headlines',{data:results})
          // res.status(200).json({data:results});
         } catch (e) {
           res.status(500).json({ message: e.message })
         }
         
        }
     }); 
});


module.exports=router;