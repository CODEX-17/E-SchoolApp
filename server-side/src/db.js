const mysql = require('mysql')

const pool = mysql.createPool(
    {
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'e-school-app'
    }
)

module.exports = pool