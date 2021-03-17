import mysql from 'mysql';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT || ''),
    connectionLimit: 10,
    ssl  : {
        ca : fs.readFileSync(__dirname + '/mysql-ca.crt')
    }
});

export {
    connection
};