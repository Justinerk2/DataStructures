var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs'); // nmp instal fs



var apiKey = process.env.API_KEY; //api key calling from the enviornment
// code pulling first line of address
var meetingsData = []; // creating meeting data array
//pulling first line of addresses
var addresses = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/data/arrayAddresses.txt'));
//creating an array addressClean for the cleaned up addresses
var addressClean = [];
//creating a for loop to run through addresses for cleaning
for (var i = 0; i < addresses.length; i++) {
    // fixing addresses, removing comma issues, replacing spaces with + for the google api, and adding New York, NY at the end of each address line
    addressClean.push(((addresses[i].substring(0, addresses[i].indexOf(','))) + ', New York, NY').split(' ').join('+'));
    // eachSeries in the async module iterates over an array and operates on each item in the array in series
   }
   async.eachSeries(addressClean, function(value, callback) {

        // requesting API
        var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey;
        // creating a new object called this meeting
        var thisMeeting = new Object;
        thisMeeting.address = value;
        request(apiRequest, function(err, resp, body) {
            // throwing an error if it occurs
            if (err) {
                throw err;
            }
            //having zero results appear in the console if no results appear
            if (JSON.parse(body).status == "ZERO_RESULTS") {
                console.log("ZERO RESULTS for" + thisMeeting.address);
            } else {
                
            thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
            meetingsData.push(thisMeeting);
             }
        });
        //slowing down the results so that the API rules are met
        setTimeout(callback, 1000);
    }, function() {
        fs.writeFile('/home/ubuntu/workspace/data/assign3AddrData.txt', JSON.stringify(meetingsData), function(err){
            if (err) 
                return console.log('Error');
            console.log('Wrote ' + meetingsData.length + ' entries to file ' + 'assign3AddrData.txt');
        });
    });
