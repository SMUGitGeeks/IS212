require('dotenv').config()

const mysql = require('mysql2')

const connectDB = async () => {
    try {
        // Create the connection to the database
        const connection = mysql.createConnection(process.env.DATABASE_URL)
        console.log("Connected to MySQL database.")
        // simple query
        connection.query('show tables', function (err, results, fields) {
            console.log(results) // results contains rows returned by server
            console.log(fields) // fields contains extra metadata about results, if available
        })

        // Example with placeholders
        connection.query('select 1 from dual where ? = ?', [1, 1], function (err, results) {
            console.log(results)
        })

        connection.end()
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectDB