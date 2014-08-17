var test = require("tap").test
var mysql = require('mysql');
var host = 'localhost';
var user = 'devel';
var password = 'letme!n';
var database = 'readings';

test('validate database connection', function(t) {
   t.plan(2);
   t.ok('This runs');
   var connection = mysql.createConnection({
      host     : host,
      user     : user,
      password : password,
      database : database
   });

  
   connection.connect();

   connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        if (err) throw err;
          t.equal(2, rows[0].solution)
          //console.log('The solution is: ', rows[0].solution);
   });

   connection.end();
});

test('validate table exists', function(t) {
   t.plan(5);
   var connection = mysql.createConnection({
      host     : host,
      user     : user,
      password : password,
      database : database
   });

   connection.connect();

   connection.query('SELECT * from todmordon;', function(err, rows, fields) {
        if (err) throw err;
          t.ok('feeling grovy');
          t.equal(fields[0].name, 'id');
          t.equal(fields[1].name, 'sensor_name');
          t.equal(fields[2].name, 'reading_time');
          t.equal(fields[3].name, 'reading_value');
          //console.log(fields);
   });

   connection.end();

});
