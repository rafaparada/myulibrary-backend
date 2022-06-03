import mysql from 'mysql2';

import dotenv from 'dotenv';

dotenv.config();

const dbconnection = mysql.createConnection({
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements:true
});

dbconnection.connect((ThereIsError)=>{
    if(ThereIsError){
        console.log(ThereIsError);
    }else{
        console.log("Connection successful");
    }
});


export default dbconnection;