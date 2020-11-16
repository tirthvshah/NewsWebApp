require('./config/passportConfig');
const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const filterroutes=require('./routes/filters');
const Searchroutes=require('./routes/search');
const user=require('./routes/user');
const Headlineroute = require('./routes/headline');
const Aboutroute = require('./routes/about');
const passport=require('passport');
const { ensureAuthenticated,forwardAuthenticated} = require('./config/auth');
const flash = require('connect-flash');
const session = require('express-session');

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );  
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// app.use('/search',Searchroutes);
app.use('/headlines',ensureAuthenticated,Headlineroute)
app.get('/',(req,res)=>{
    res.redirect('/headlines')
})
// app.post('/weather',(req,res)=>{
//   console.log(req.body)
// })

app.listen('3000',() =>{
    console.log("Server started ");
});

app.use(express.static('public'))
app.use('/filters',ensureAuthenticated,filterroutes);
app.use('/search',ensureAuthenticated,Searchroutes);
app.use('/users',forwardAuthenticated,user);
app.use('/about',ensureAuthenticated, Aboutroute);
app.get('/logout',(req,res)=>{
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login')
});

module.exports = app;