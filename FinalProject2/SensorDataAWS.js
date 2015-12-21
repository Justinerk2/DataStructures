var http = require('http');
var pg = require('pg');

// add connection string here
var conString = "postgres://jkeller:pgdv2016@temp-data-structures.c9cifybwcqla.us-east-1.rds.amazonaws.com:5432/postgres"; //connection string

var five = require("johnny-five"),
    temperature

five.Board().on("ready", function() {

    var temperature = new five.Temperature({
        controller: "TMP36", //use sensor TMP35
        pin: "A0", //wire in A0
        freq: 1000 //slow down reads to every second
    });

    temperature.on("data", function() {
        console.log(this.celsius + "°C", this.fahrenheit + "°F"); //show in console celsius and fahrenheit readings

        pg.connect(conString, function(err, client, done) {
            if (err) {
                return console.error('error fetching client from pool', err);
            }

            client.query("INSERT INTO tempData VALUES, DEFAULT);", function(err, result) {
                //call `done()` to release the client back to the pool
                done();

                if (err) {
                    return console.error('error running query', err);
                }
                console.log(result);
            });

        });
    })
});