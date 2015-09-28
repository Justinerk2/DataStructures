//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBz-zx0VOedjDn7QlOR-BpoZqPovRMoIn0

//API key:  AIzaSyBz-zx0VOedjDn7QlOR-BpoZqPovRMoIn0
// ^^ remember to get rid of API key- its the in the enviornment
//JSON.parse(body) let's node know its an object in json

var apiKey = process.env.API_KEY;
var URLtoParse = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=' + apiKey;
var names = ["Alex", "Betsy", "Chris", "Diana"];

var async = require('async');
//eachSeries: do each of these things in series - will do things in order regardless of how long each thing takes
//async.eachSeries(array, functionForValue, callbackFunction) callback is optional
async.eachSeries(names, function(value, callback){
   console.log(value);
    setTimeout(callback,2500);
}, function(){
    console.log("we're done with the whole thing!")
});

//function y () {
//    console.log("why???");
//}

//setTimeout(y, 5000);
