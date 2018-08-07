let mysql = require('mysql');
let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sys'
});
const query = function (sql, option, callback) {
    pool.getConnection(function (err, connection) {
        console.log('getConnection => ' + err);
        connection.query(sql, option, function (error, results, fields) {
            console.log('query => ' + error);
            connection.release();
            if (error) throw error;
            callback(err, results, fields)
        })
    })
};

module.exports = query;