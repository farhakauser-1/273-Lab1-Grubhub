var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit: 1000,
  host: "localhost",
  user: "root",
  password: "password",
  database: "GrubHub"
});
var dbParameters = require("./DBdetails");
exports.executeQuery = function(sql, callback) {
  var conn = mysql.createConnection(dbParameters.dbDetails);
  conn.connect(function(err) {
    console.log(sql);
    if (err) throw err;
    conn.query(sql, function(err, result) {
      if (err) throw err;
      callback(err, result);
    });
  });
};
