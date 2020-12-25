const express = require('express');
const router= express.Router();
const axios = require('axios')
const { response } = require('..')


// router.get('/',(req,res)=>{
//     axios.get(`https://gnews.io/api/v4/search?q=Apple&lang=en&max=100&token=`)
//     .then(response=>{
//         if(response.status == 200){
//             console.log(response.data.articles)
//             // arr = response.data.results.multimedia
//             // arr.forEach(data=>{
//                 // console.log(data)
//             // })
//             console.log(response.data.totalArticles)
//             res.render('headlines',{data:response.data.articles})
//         }
//     })
// })

const API_KEY = process.env.API_KEY

router.get('/',(req,res)=>{
    // axios.get(`https://newsapi.org/v2/everything?q="sports"OR"business"OR"entertainment"OR"politics"OR"technology"&sortBy=publishedAt&pageSize=100&sortBy=relevancy&apiKey=${API_KEY}`)
    axios.get(`http://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`)
    .then(response=>{
        if(response.status == 200){
/*             console.log(response.data.articles)
            console.log(response.data.totalResults) */
           /* console.log(response.data.articles.length); */
           var fullUrl = req.originalUrl.split('?page');
           /* console.log(fullUrl); */
            var page = parseInt(req.query.page)
            const limit = parseInt(7)
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
            try {
              results.results = response.data.articles.slice(startIndex,endIndex)
              res.render('headlines',{data:results})
             // res.status(200).json({data:results});
            } catch (e) {
              res.status(500).json({ message: e.message })
            }
            
        }
    })
})



module.exports = router;
