var request = require("request"); //call request
var fs = require("fs"); //call fs
var async = require('async'); // call async
var cheerio = require("cheerio"); //call cheerio

var apiKey = 'AIzaSyBz-zx0VOedjDn7QlOR-BpoZqPovRMoIn0'; //api key, process.env.API_KEY; //api key calling from the enviornment

var addresses = [];
var addressClean = []; //array for cleaned up full address
var cleanAddresses = []; //array for final addresses with lat and long

var content = fs.readFileSync('/home/ubuntu/workspace/data/aameetinglist.txt'); //Pull in website text
var $ = cheerio.load(content); //loading cheerio content into $

$('table[cellpadding=5]').find('tbody').find('tr').each(function(i, elem) { //pulling info from table with cellpadding 5 which is all the meeting info and running through a loop of all the data

    addresses = $(elem).find('td').eq(0).html().split('<br>')[2].trim(); //filling array with first line of meeting addresses
    for (var i = 0; i < addresses.length; i++) {
        addressClean.push((addresses[i].substring(0, addresses[i].indexOf(',')) + ', New York, NY').split(' ').join('+')); // fixing addresses, removing comma issues, replacing spaces with + for the google api, and adding New York, NY at the end of each address line
        console.log(addressClean);

    }
    async.eachSeries(addressClean, function(value, callback) { // eachSeries in the async module iterates over an array and operates on each item in the array in series

            var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey; // requesting API

            var thisMeeting = new Object; // creating a new object called this meeting
            thisMeeting.address = value;

            request(apiRequest, function(err, resp, body) {

                if (err) { // throwing an error if it occurs
                    throw err;
                }

                if (JSON.parse(body).status == "ZERO_RESULTS") { //having zero results appear in the console if no results appear
                    console.log("ZERO RESULTS for" + thisMeeting.address);
                }
                else {

                    thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
                    cleanAddresses.push(thisMeeting);
                }
            });

            setTimeout(callback, 500); //slowing down the results so that the API rules are met

        },
        fs.writeFileSync('/home/ubuntu/workspace/FinalProject1/cleanAddresses.txt', JSON.stringify(cleanAddresses))
    );
});