var request = require("request"); //call request
var fs = require("fs"); //call fs
var cheerio = require("cheerio"); //call cheerio

var meetingDetails = [];
var daysNumb = [];
var meetings = [];

var cleanMeetingNames = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/FinalProject1/cleanMeetingNames.txt'));
var cleanAddresses = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/FinalProject1/cleanAddresses.txt'));

var content = fs.readFileSync('/home/ubuntu/workspace/FinalProject1/aameetinglist.txt'); //Pull in website text
var $ = cheerio.load(content); //loading cheerio content into $

$('table[cellpadding=5]').find('tbody').find('tr').each(function(i, elem) { //pulling info from table with cellpadding 5 which is all the meeting info and running through a loop of all the data
        var meetingsObj = new Object;

        meetingsObj.meetingName = cleanMeetingNames[i];

        meetingsObj.meetingAddress = cleanAddresses[i];

        meetingDetails.push($(elem).find('td').eq(1).html().trim().replace(/>\s*/g, '>').replace(/\s*</g, "<").split("<br><br>")); // fill array with meeting details
        for (var j in meetingDetails) {
            var meetdet = meetingDetails[j].toString().split("b>");
            var days = meetdet[1].substr(0, meetdet[1].indexOf('From')).trim();
            if (days != "s") {
                var starttimes = meetdet[2].substr(0, meetdet[2].indexOf('<')).trim();
                var endtimes = meetdet[4].substr(0, meetdet[4].indexOf('<')).replace(",", "").trim();
                var type = meetdet[6].substr(0, meetdet[6].indexOf('<')).replace(/"/g, "").replace(",", "").trim();
                for (var l = 1; l < meetdet.length; l++) {
                    if (meetdet[l].substr(0, 7) === "Special") {
                        var specInt = meetdet[l + 1].replace(",", "").replace(",", "").replace("<", "").trim();
                        // console.log(days + " " + starttimes + " " + endtimes + " " + type + " " + specInt);
                        if (days == 'Sundays') {
                            days = 'Sundays';
                            daysNumb = 0;
                        }
                        else if (days == 'Mondays') {
                            days = 'Mondays';
                            daysNumb = 1;
                        }
                        else if (days == 'Tuesdays') {
                            days = 'Tuesdays';
                            daysNumb = 2;
                        }
                        else if (days == 'Wednesdays') {
                            days = 'Wednesdays';
                            daysNumb = 3;
                        }
                        else if (days == 'Thursdays') {
                            days = 'Thursdays';
                            daysNumb = 4;
                        }
                        else if (days == 'Fridays') {
                            days = 'Fridays';
                            daysNumb = 5;
                        }
                        else if (days == 'Saturdays') {
                            days = 'Saturdays';
                            daysNumb = 6;
                        }
                        
                        meetingsObj.meetingDay = days;
                        
                        meetingsObj.meetingDayNumb = daysNumb;

                        meetingsObj.meetingStartTime = starttimes;

                        meetingsObj.meetingEndTime = endtimes;

                        meetingsObj.meetingType = type;

                        meetingsObj.meetingSpecialInt = specInt;

                    }

                }
            }

        }
        meetingsObj.meetingLocation = $(elem).find('h4').eq(0).text().trim().replace('&apos;', "'").replace(/@/g, "at"); // fill array for meeting locations

        var accessable = $(elem).find('span').eq(0).text().trim(); //fill array with wheelchair accessable information
         
        meetingsObj.wheelChairAccessable = accessable;

        meetingsObj.meetingAddInfo = $(elem).find('.detailsBox').eq(0).text().trim(); //fill meetingAddInfo with extra info about the meetings

        meetings.push(meetingsObj);

        console.log(meetings);
    }),
    fs.writeFileSync('/home/ubuntu/workspace/FinalProject1/aameetingsMeetings.txt', JSON.stringify(meetings, null, 1));


// function missingDataSpecInt (){
//   if ("undefined"){
//       return "N/A";
//   } else {
//       return specInt;
//   }
// }

// function nowheelchair () {
//     if ("undefined"){
//         return "Not Wheelchair Accessable";
//     } else {
//         return "Wheelchair Accessable";
//     }
// }