var http = require('http'); // call http
var pg = require('pg'); //call pg

var conString = "postgres://jkeller:pgdv2016@temp-data-structures.c9cifybwcqla.us-east-1.rds.amazonaws.com:5432/postgres"; //connection string

var server = http.createServer(function(req, res) { //create server

  pg.connect(conString, function(err, client, done) { // get a pg client

var handleError = function(err){
  
     if (!err) return false;
     if (client){
       done(client);
     }
     
res.writeHead(500,{'context-type':'text/plain'});
res.edn('An error occured');
return true;
};
   if (handleError(err)) return;
     client.query(DateTempQuery(), function(err, result) {
       if(handleError(err)) return;
       done();
       res.writeHead(500,{'context-type':'text/html'});
       res.write(JSON.stringify(result.rows));
       res.end();
     });
  });
}):

server.listen(process.env.PORT);


  function DateTempQuery(){
    
  }     
       
       
//     client.query('SELECT COUNT(*) AS count FROM tempature;', function(err, result) { // THIS SHOULD BE AN 'INSERT INTO' STATEMENT
 



// var five = require("johnny-five"),
//   temperature;  //calling johnny five
//   five.Board().on("ready", function() {

//     var temperature = new five.Temperature({
//       controller: "TMP36", //use sensor TMP35
//       pin: "A0", //wire in A0
//       freq: 1000 //slow down reads to every second
//     });

//     temperature.on("data", function() {
//       console.log(this.celsius + "°C", this.fahrenheit + "°F"); //show in console celsius and fahrenheit readings

//     });
//   });
//     if (err) {
//     }
//       done();

//       if (err) {
//         return console.error('error running query', err);
//       }
//       if (handleError(err)) return;
//       console.log(result);
//       res.writeHead(200, {
//         'content-type': 'text/html'
//       });
//       res.write('<h1>The input has been recorded ' + temperature + ' times. </h1>');
//       res.end();
//     });

//   });
// });
// server.listen(process.env.PORT);