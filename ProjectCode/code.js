var request = require("request"); //call request
var fs = require("fs"); //call fs
var cheerio = require("cheerio"); //call cheerio
var async = require("async"); //call async

var apiKey = 'AIzaSyBz-zx0VOedjDn7QlOR-BpoZqPovRMoIn0'; //api key, process.env.API_KEY; //api key calling from the enviornment
var apiGoogleURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='; //google api url
var addressesUpdated = new Object; // object for updated addresses

var addresses = [];
var cleanAddresses = [];
var meetingName = [];
var cleanMeetings = [];
var localName = [];
var meetingAddInfo = [];
var accessable = [];
var meetingTimes = [];
var meetingType = [];
var startHour = [];
var startMin = [];
var days = [];
var specialInt = [];
var meetingAdd = new Object;
var meetingsObj = new Object;


var content = fs.readFileSync('/home/ubuntu/workspace/data/aameetinglist02M.txt') //load website text
var $ = cheerio.load(content); //loading cheerio content into $

$('table[cellpadding=5]').find('tbody').find('tr').each(function(i, elem) { //pulling info from table with cellpadding 5 which is all the meeting info

    addresses.push($(elem).find('td').eq(0).html().split('<br>')[2].trim()); //filling addresses array with first line of meeting addresses

    meetingName.push($(elem).find('b').eq(0).text().replace(/\s+/g, ' ').trim()); //filling meetingName array with meeting names

    localName.push($(elem).find('h4').eq(0).text().replace('&apos;', "'").replace(/\ /, " ").trim()); //filling localName array with meeting lcoations name

    meetingTimes.push($(elem).find('td').eq(1).html().trim().replace(/>\s*/g, ">").replace(/\s*</g, "<").split("<br><br>"));

    meetingAddInfo.push($(elem).find('.detailsBox').eq(0).text().trim()); //fill meetingAddInfo, with extra info about the meetings

    accessable.push($(elem).find('span').eq(0).text().trim()); //filling accessible array with info about wheelchair accessiblity
});


function cleanMeetingsName(meetingName) { //function to clean up meeting names
    var second = meetingName.substr(meetingName.indexOf('-') + 2);
    var first = meetingName.substr(0, meetingName.indexOf('-') - 1);

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

//clean up times
function cleanTimes(meetingTimes){
    var from = meetingTimes.indexOf(meetingTimes.match("From"));
    meetingType = meetingTimes.substr(meetingTimes.indexOf(meetingTimes.match("Type"))+ 5, 2);
    startHour = meetingTimes.subtr(from + 4, 2);
    startMin = meetingTimes.subtr(from +7, 2);
    days = meetingTimes.substring(0, from -2);
    if (meetingTimes.indexOf('Interest') != -1) {
         specialInt = meetingTimes.substr(meetingTimes.indexOf(meetingTimes.match("Interest"))+ 8);
    }
    else {
        specialInt = null;
    }
}

if (days == "Monday") {// converting days into numbers
        days = 1;
    }
    else if (days == "Tuesday") {
        days = 2;
   }
    else if (days == "Wednesday") {
        days = 3;
    }
   else if (days == "Thursday") {
       days = 4;
   }
    else if (days == "Friday") {
        days = 5;
    }
    else if (days == "Saturday") {
        days = 6;
    }
    else if (days == "Sunday") {
        days = 7;
   }
   

//cleaning addresses and adding latitude and longitude
for (var i = 0; i < addresses.length; i++) {
    // fixing addresses, removing comma issues, replacing spaces with + for the google api, and adding New York, NY at the end of each address line
    cleanAddresses.push(((addresses[i].substring(0, addresses[i].indexOf(','))) + ', New York, NY').split(' ').join('+'));
    // eachSeries in the async module iterates over an array and operates on each item in the array in series
}
async.eachSeries(cleanAddresses, function(value, callback) {
    // requesting API
    var apiRequest = apiGoogleURL + value.split(' ').join('+') + '&key=' + apiKey;
    // creating a new object called this meeting
    meetingAdd.address = value;
    request(apiRequest, function(error, resp, body) {
        // throwing an error if it occurs
        if (error) {
            throw error;
        }
        //having zero results appear in the console if no results appear
        if (JSON.parse(body).status == "ZERO_RESULTS") {
            console.log("ZERO RESULTS for" + meetingAdd.address);
        }
        else {
            meetingAdd.latLong = JSON.parse(body).results[0].geometry.location;
            addressesUpdated.push(meetingAdd);
        }
    });
    //slowing down the results so that the API rules are met
    setTimeout(callback, 500);
}, function() { //functions to write a text document of addresses
    fs.writeFile('/home/ubuntu/workspace/FinalProject1/DataAddresses.txt', JSON.stringify(addressesUpdated), function(error) {
        if (error)
            return console.log('Error');
    });
});


MongoClient.connect(url, function(err, db) {
            if (err) {
                return console.dir(err);
            }

            var collection = db.collection('aameetings');
            for (var i = 0; i < aameetings.length; i++) {
                collection.insert(aameetings[i]);
            }
              $unwind: "$hours"
        },

        {
            $project: {
                _id: 0,
                localName: 1,
                cleanMeetings: 1,
                addresses: 1,
                cleanaddresses: 1,
                latlong: 1,
                meetingAddInfo: 1,
                hours: 1,
                accessable: 1,
                "cumulative": {
                    $add: [{
                        "$multiply": [1440, "$hours.day"]
                    }, {
                        "$multiply": [60, "$hours.startHour"]
                    }, "$hours.startMinute"]
                }
            }
        }, {
            $match: {
                "cumulative": {
                    $gte: 2580,
                    $lt: 3120
                }
            }
        }
    .toArray();
    db.close();

});
                      
                                db.close();
                            })

                        } //MongoClient.connect}
                    }
