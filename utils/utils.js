let mysql = require('mysql');
let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'sys'
});
const query = function (sql, callback) {
  pool.getConnection(function (err, connection) {
    console.log('getConnection => ' + err);
    connection.query(sql, function (error, results) {
      console.log('query => ' + error);
      if (error) throw error;
      callback(err, results)
      connection.release();
    })
  })
};

module.exports = query;