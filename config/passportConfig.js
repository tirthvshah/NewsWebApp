const passport=require('passport');
const localStratergy=require('passport-local').Strategy;
const {database}=require('../config/helper');
const PasswordHash= require('password-hash');
passport.use(
    new localStratergy({
        usernameField:'email'
    },
    function(email,password,done){
        let sql=`SELECT * FROM users WHERE email= "${email}"`;
        database.query(sql,(err,result)=>{
            if(err){
                return done(err);
            }
            if(result.length>0){
                if(PasswordHash.verify(password,result[0].password)){
                    return done(null,result[0]);
                }else{
                    return done(null,false,{message:'Email Or Password Does not match'});
                }
            }else{
                return done(null,false,{message:'Email Or Password Does not match'});
            }
        })
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
      let sql=`SELECT * FROM users WHERE id= "${id}"`;
      database.query(sql,(err,user)=>{
        done(err,user[0]);
      });
  });
