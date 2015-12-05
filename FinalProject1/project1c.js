var request = require("request"); //call request
var fs = require("fs"); //call fs
var cheerio = require("cheerio"); //call cheerio

var cleanMeetings = [];
var content = fs.readFileSync('/home/ubuntu/workspace/FinalProject1/aameetinglist.txt'); //Pull in website text
var $ = cheerio.load(content); //loading cheerio content into $

$('table[cellpadding=5]').find('tbody').find('tr').each(function(i, elem) { //pulling info from table with cellpadding 5 which is all the meeting info and running through a loop of all the data

        var meetingName = $(elem).find('b').eq(0).text().replace(/\s+/g, ' ').replace(/A.A./g, "AA").replace(/(:I)/g, "").replace(/(I)/g, "").replace(/(:II)/g, "").replace(/\(\)/g, "").replace("T&A-", "").trim(); //filling array with meeting names

        var second = meetingName.substr(meetingName.indexOf('-') + 2);
        var first = meetingName.substr(0, meetingName.indexOf('-') - 1);

        if (first == second.toUpperCase()) {
            cleanMeetings.push(first);
        }
        else if (second == "") {
           cleanMeetings.push(first);
        }
        else {
            cleanMeetings.push(second.toUpperCase());
        }
        return cleanMeetings;
    }),
  
        fs.writeFileSync('/home/ubuntu/workspace/FinalProject1/cleanMeetingNames.txt', JSON.stringify(cleanMeetings));