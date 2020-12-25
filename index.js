require('./config/passportConfig');
const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const filterroutes=require('./routes/filters');
const Searchroutes=require('./routes/search');
const user=require('./routes/user');
const Headlineroute = require('./routes/headline');
const CovidTracker = require('./routes/covid-tracker');
const Aboutroute = require('./routes/about');
const CookieSession=require('cookie-session');
const passport=require('passport');
const { ensureAuthenticated,forwardAuthenticated} = require('./config/auth');
const flash = require('connect-flash');
const session = require('express-session');

if (process.env.NODE_ENV !== "production"){
	require('dotenv').config()
}


app.use(
    CookieSession({
      maxAge:24*60*60*1000,
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

app.listen('3000',() =>{
    console.log("Server started ");
});

app.use(express.static('public'))
app.use('/filters',ensureAuthenticated,filterroutes);
app.use('/search',ensureAuthenticated,Searchroutes);
app.use('/users',forwardAuthenticated,user);
app.use('/about',ensureAuthenticated, Aboutroute);
app.use('/covid-tracker',ensureAuthenticated, CovidTracker);
app.get('/logout',(req,res)=>{
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users')
});

module.exports = app;