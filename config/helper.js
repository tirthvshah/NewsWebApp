const mysql=require('mysql');
const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"pwd",
    database:"newswebapp"
});
module.exports={
    database:db
};