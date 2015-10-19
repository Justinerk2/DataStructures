// WEEK 3 code to prepare homework
// var fs = require('fs');
// var cheerio = require('cheerio');
// //creating a variable for the file content

// var fileContent = fs.readFileSync('/home/ubuntu/workspace/data/aameetinglist02M.txt');
// var meetings = [];

// //creating cherrio variable $
// var $ = cheerio.load(fileContent);
// //using cheerio to only collect the data within the table with cellpadding = 5 and naming that variable table
// var table = $('tr').attr('cellpadding', '5');
// // creating a varable address to parse the table to find the rows and creating the each function
//  $(table).find('tr').each(function(i, elem) {
//     $(elem).find('td').eq(0).each(function(i,elem){
//         console.log($(elem).html().split("<br>")[2].trim());
//     });
// });
// fs.writeFileSync('/home/ubuntu/workspace/data/arrayAddresses.txt', JSON.stringify(meetings));
var fs = require('fs');
var request = require('request'); // npm install request
var async = require('async'); // npm install async

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// export NEW_VAR="Content of NEW_VAR variable"
// printenv | grep NEW_VAR
var apiKey = process.env.GMAKEY;

var meetingsData = [];
var addresses = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/data/arrayAddresses.txt'));

function fixAddresses (oldAddress) {
    var newAddress = oldAddress.substring(0, oldAddress.indexOf(',')) + ", New York, NY";
    return newAddress;
}


// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + fixAddresses(value.split(' ').join('+') + '&key=' + apiKey);
    var thisMeeting = new Object;
    thisMeeting.address = fixAddresses(value);
    thisMeeting.originalAddress = value;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        meetingsData.push(thisMeeting);
    });
    setTimeout(callback, 500);
}, function() {
 fs.writeFileSync('/home/ubuntu/workspace/data/geocodeMeetings.txt', JSON.stringify(meetingsData));
});