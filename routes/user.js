const express=require('express');
const routes=express.Router();
const {database}=require('../config/helper');
const PasswordHash= require('password-hash');
const passport=require('passport');
routes.get('/login',(req,res)=>{
    res.render('login');
});

routes.get('/register',(req,res)=>{
    res.render('register');
})

routes.post('/register',(req,res)=>{
    const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
        let sql=`SELECT id FROM users WHERE email='${email}'`;
        database.query(sql,(err,result)=>{
            if(result.length>0){
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                  errors,
                  name,
                  email,
                  password,
                  password2
                });
            }else{
                const hash=PasswordHash.generate(password);
                let sql=`INSERT INTO users (name,email,password) Values(
                    '${name}',
                    '${email}',
                    '${hash}'
                )`; 
                database.query(sql,(err,result)=>{
                    if(err){
                        throw err;
                    }
                    req.flash('success_msg','You are now registered and can log in');
                    res.redirect('/users/login');
                })
            }
        })
      }
});

routes.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash:true
    })(req, res, next);
  });
  
  routes.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login')
  });

module.exports=routes;