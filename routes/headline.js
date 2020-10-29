const express = require('express');
const router= express.Router();
const axios = require('axios')
const { response } = require('..')


router.get('/',(req,res)=>{
    axios.get(`https://newsapi.org/v2/everything?q="sports"OR"business"OR"entertainment"OR"politics"OR"technology"&sortBy=publishedAt&pageSize=100&sortBy=relevancy&apiKey=4b2821b99dd64a708f00564be388c26a`)
    .then(response=>{
        if(response.status == 200){
            console.log(response.data.articles)
            console.log(response.data.totalResults)
            res.render('headlines',{data:response.data.articles})
        }
    })
})


module.exports = router;
