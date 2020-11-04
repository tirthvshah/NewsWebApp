const mysql=require('mysql');
require('custom-env').env()
const db= mysql.createConnection({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
});
module.exports={
    database:db
};