var five = require("johnny-five");
five.Board().on("ready", function() {
  var temperature = new five.Temperature({
    controller: "TMP36",
    pin: "A0",
    freq:500
  });

  temperature.on("data", function() {
    console.log(this.celsius + "°C", this.fahrenheit + "°F");
    
  });
});

// Button Pressed to get Temperature
// var five = require("johnny-five"),
//   bumper, temperature;

// five.Board().on("ready", function() {
//   var temperature = new five.Temperature({
//     controller: "TMP36", //use sensor TMP35
//     pin: "A0" //wire in A0
  
//   });
//     bumper = new five.Button(7);

//   bumper.on("hit", function() {
//   temperature.on("data", function() {
//     console.log(this.celsius + "°C", this.fahrenheit + "°F"); //show in console celsius and fahrenheit readings

//   });

//   });
// });