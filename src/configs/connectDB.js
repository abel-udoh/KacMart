import mysql from "mysql2";
import 
require('dotenv').config();

let connection = mysql.createConnection( opts, {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});

connection.connect( cb, function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});

module.exports = connection;