var http = require('http'); // call http
var pg = require('pg'); //call pg

var conString = "postgres://jkeller:pgdv@temp-data-structures.c9cifybwcqla.us-east-1.rds.amazonaws.com:5432/postgres"; //connection string

var five = require("johnny-five"),
  temperature;  //calling johnny five

var server = http.createServer(function(req, res) {

  five.Board().on("ready", function() {

    var temperature = new five.Temperature({
      controller: "TMP36", //use sensor TMP35
      pin: "A0", //wire in A0
      freq: 1000 //slow down reads to every second
    });

    temperature.on("data", function() {
      console.log(this.celsius + "°C", this.fahrenheit + "°F"); //show in console celsius and fahrenheit readings

    });
  });
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
   if (handleError(err)) return;
    client.query('SELECT COUNT(*) AS count FROM tempature;', function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if (err) {
        return console.error('error running query', err);
      }
      if (handleError(err)) return;
      console.log(result);
      res.writeHead(200, {
        'content-type': 'text/html'
      });
      res.write('<h1>The input has been recorded ' + result.rows[0].count + ' times. </h1>');
      res.end();
    });

  });
});
server.listen(process.env.PORT);