const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


module.exports = connection