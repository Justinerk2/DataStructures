var request = require("request"); //call request
var fs = require("fs"); //call fs
var cheerio = require("cheerio"); //call cheerio
var async = require("async"); //call async

var apiKey = 'AIzaSyBz-zx0VOedjDn7QlOR-BpoZqPovRMoIn0'; //api key, process.env.API_KEY; //api key calling from the enviornment
var apiGoogleURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='; //google api url

var meetings = [];
// var meetingName = []; //Array for Meeting Names
// var cleanMeetings = []; //Array for clean Meeting Names
// var addresses = []; //Array for Addresses
// var cleanAddresses = []; //Array for clean Addresses
// var addressData = new Object; //Object for adress data for lat and long
// var addressesUpdated = new Object; //Array for addresses with lat and Long
// var accessable = []; //Array for wheelchair accessable info
// var meetingDetails = []; //Arrary for Meeting details (days, times, types, special interest)
// var meetingTimes = []; //Array for Meeting Time
// var meetingDays = []; //Array for Meeting Days
// var meetingType = []; //Array for Meeting Type
// var meetingSpecialInt = []; //Array for Special Interest
// var meetingLocation = []; //Array for Meeting Locations
// var meetingAddInfo = []; //Array for additional meeting details


var content = fs.readFileSync('/home/ubuntu/workspace/data/aameetinglist02M.txt') //Pull in website text
var $ = cheerio.load(content); //loading cheerio content into $

$('table[cellpadding=5]').find('tbody').find('tr').each(function(i, elem) { //pulling info from table with cellpadding 5 which is all the meeting info and running through a loop of all the data

    var thisMeeting = new Object; 

    thisMeeting.meetingName = $(elem).find('b').eq(0).text().replace(/\s+/g, ' ').replace(/A.A./g, "AA").replace(/(:I)/g, "").replace(/(I)/g, "").replace(/(:II)/g, "").trim(); //filling array with meeting names

    addresses.push($(elem).find('td').eq(0).html().split('<br>')[2].trim()); //filling array with first line of meeting addresses

    accessable.push($(elem).find('span').eq(0).text().trim()); //fill array with wheelchair accessable information

    meetingDetails.push($(elem).find('td').eq(1).html().trim().replace(/>\s*/g, '>').replace(/\s*</g, "<").split("<br><br>")); // fill array with meeting details

    meetingLocation.push($(elem).find('h4').eq(0).text().trim().replace(/\'s/g, "'s").replace('&apos;', "'").replace(/@/g, "at")); // fill array for meeting locations

    meetingAddInfo.push($(elem).find('.detailsBox').eq(0).text().trim()); //fill meetingAddInfo with extra info about the meetings

    // here you will PUSH "thisMeeting" into "meetings" array

});





function cleanMeetingsName(meetingName) { //function to clean up meeting names
    meetingName.indexOf('-');
    meetingName.substr(0, meetingName.indexOf('-') - 2);
    meetingName.substr(0, meetingName.indexOf('-') - 1);
    meetingName.substr(0, meetingName.indexOf('-') + 1);
    meetingName.substr(0, meetingName.indexOf('-') + 2);

    var second = meetingName.substr(meetingName.indexOf('-') + 2);
    var first = meetingName.substr(0, meetingName.indexOf('-') - 1);
    second.substr(0, first.length);


    if (first == second.toUpperCase()) {
        cleanMeetings = first.replace(/-/g, ' ');
    }
    else if (second == "") {
        cleanMeetings = first.replace(/-/g, ' ');
    }
    else {
        cleanMeetings = second.replace(/-/g, ' ').toUpperCase();
    }
    return cleanMeetings;
};

//cleaning addresses and adding latitude and longitude
for (var i = 0; i < addresses.length; i++) {
    // fixing addresses, removing comma issues, replacing spaces with + for the google api, and adding New York, NY at the end of each address line
    cleanAddresses.push(((addresses[i].substring(0, addresses[i].indexOf(','))) + ', New York, NY').split(' ').join('+'));
    // eachSeries in the async module iterates over an array and operates on each item in the array in series
}
async.eachSeries(cleanAddresses, function(value, callback) {
    // requesting API
    var apiRequest = apiGoogleURL + value.split(' ').join('+') + '&key=' + apiKey;
    
    addressData.address = value;
    request(apiRequest, function(error, resp, body) {
        // throwing an error if it occurs
        if (error) {
            throw error;
        }
        //having zero results appear in the console if no results appear
        if (JSON.parse(body).status == "ZERO_RESULTS") {
            console.log("ZERO RESULTS for" + addressData.address);
        }
        else {
            addressData.latLong = JSON.parse(body).results[0].geometry.location;
            addressesUpdated.push(addressData);
        }
    });
    //slowing down the results so that the API rules are met
    setTimeout(callback, 1000);
}, function() { //functions to write a text document of addresses
    fs.writeFile('/home/ubuntu/workspace/FinalProject1/DataAddresses.txt', JSON.stringify(addressesUpdated), function(error) {
        if (error)
            return console.log('Error');
    });
});
console.log(addressesUpdated);