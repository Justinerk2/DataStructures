var request = require("request"); //call request
var fs = require("fs"); //call fs
var async = require('async'); // call async

var apiKey = 'AIzaSyBz-zx0VOedjDn7QlOR-BpoZqPovRMoIn0'; //api key, process.env.API_KEY; //api key calling from the enviornment

var AddressLatLong = [];

var meetingObj = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/FinalProject1/aameetingsCleanData.txt'));

for (var i in meetingObj) {

    var address = meetingObj[i].cleanMeetingAddress.split(' ').join('+'); // fixing addresses, removing comma issues, replacing spaces with + for the google api, and adding New York, NY at the end of each address line
}
async.eachSeries(address, function(value, callback) { // eachSeries in the async module iterates over an array and operates on each item in the array in series

            var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey; // requesting API

        
         address = value;

            request(apiRequest, function(err, resp, body) {

                if (err) { // throwing an error if it occurs
                    throw err;
                }

                if (JSON.parse(body).status == "ZERO_RESULTS") { //having zero results appear in the console if no results appear
                    console.log("ZERO RESULTS for" + address);
                }
                else {

                  var  latLong = JSON.parse(body).results[0].geometry.location;
                 console.log(latLong);
                }
            });

            setTimeout(callback, 500); //slowing downthe results so that the API rules are met

    console.log(AddressLatLong);
});
        // fs.writeFileSync('/home/ubuntu/workspace/FinalProject1/cleanAddresses.txt', JSON.stringify(cleanAddresses))