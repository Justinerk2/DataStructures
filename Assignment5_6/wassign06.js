var request = require("request"); //call request
var fs = require("fs"); //call fs
var cheerio = require("cheerio"); //call cheerio
var async = require("async"); //call async

var apiKey = process.env.API_KEY; //api key calling from the enviornment
var apiGoogleURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='
var addressesUpdated = [];


var addresses = []; //array for meeting addresses
var cleanAddresses = []; //array for clean addresses
var meetings = []; //array for meeting names
var cleanMeetings = []; //array for clean meetings
var locations = []; //array for meeting locations
var cleanLocations = []; //array for cleaning locations
var details = []; // array for meeting details
var cleanDetails = []; //array for cleaning meetings details




var content = fs.readFileSync('/home/ubuntu/workspace/data/aameetinglist02M.txt') //load website text

var $ = cheerio.load(content); //loading cheerio content into $

$('table[cellpadding=5]').find('tbody').find('tr').each(function(i, elem) {
    addresses.push($(elem).find('td').eq(0).html().split('<br>')[2].trim());
}); //filling meeting address array with meeting addresses

for (var i = 0; i < addresses.length; i++) {
    // fixing addresses, removing comma issues, replacing spaces with + for the google api, and adding New York, NY at the end of each address line
    cleanAddresses.push(((addresses[i].substring(0, addresses[i].indexOf(','))) + ', New York, NY').split(' ').join('+'));
    // eachSeries in the async module iterates over an array and operates on each item in the array in series
}
async.eachSeries(cleanAddresses, function(value, callback) {
    // requesting API
    var apiRequest = apiGoogleURL + value.split(' ').join('+') + '&key=' + apiKey;
    // creating a new object called this meeting
    var thisMeetingAdd = new Object;
    thisMeetingAdd.address = value;
    request(apiRequest, function(err, resp, body) {
        // throwing an error if it occurs
        if (err) {
            throw err;
        }
        //having zero results appear in the console if no results appear
        if (JSON.parse(body).status == "ZERO_RESULTS") {
            console.log("ZERO RESULTS for" + thisMeetingAdd.address);
        }
        else {

            thisMeetingAdd.latLong = JSON.parse(body).results[0].geometry.location;
            addressesUpdated.push(thisMeetingAdd);
        }
    });
    //slowing down the results so that the API rules are met
    setTimeout(callback, 1000);
}, function() {
    fs.writeFile('/home/ubuntu/workspace/Assignment5_6/DataAdd.txt', JSON.stringify(addressesUpdated), function(err) {
        if (err)
            return console.log('Error');
    });
});


$('table[cellpadding=5]').find('tbody').find('tr').each(function(i, elem) {
    meetings.push($(elem).find('b').eq(0).html().replace(/\s+/g, '').trim()); //add meeting names to meetings array
});

function cleanMeetingsName(meetings) {
    var second = meetings.substr(meetings.indexOf('-') + 2);
    var first = meetings.substr(0, meetings.indexOf('-') - 1);

    if (first == second.toUpperCase()) {
        cleanMeetings = first;
    }
    else if (second == "") {
        cleanMeetings = first;
    }
    else {
        cleanMeetings = second.toUpperCase();
    }
    return cleanMeetings;

};
fs.writeFile('/home/ubuntu/workspace/Assignment5_6/DataMeet.txt', JSON.stringify(cleanMeetings), function(err) {
    if (err)
        return console.log(';Error');
});

$('table[cellpadding=5]').find('tbody').find('tr').each(function(i, elem) {
    locations.push($(elem).find('h4').eq(0).html().trim().replace('&apos;', "'").replace(/\ /, " "));

    fs.writeFile('/home/ubuntu/workspace/Assignment5_6/DataLocal.txt', JSON.stringify(locations), function(err) {
        if (err)
            return console.log('Error');
    }); //filling location array with meeting locations
});


$('tbody').find('tr').each(function(i, elem) {
    details.push($(elem).find('td')[1].html().trim().replace('\r', '').replace('\n', '').replace('\t', ''));

    fs.writeFile('/home/ubuntu/workspace/Assignment5_6/DataDetails.txt', JSON.stringify(details), function(err) {
        if (err)
            return console.log('Error');
    });
});
}