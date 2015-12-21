var fs = require("fs"); //call fs
var cheerio = require("cheerio"); //call cheerio

var meetings = []; //final array for object


var content = fs.readFileSync('/home/ubuntu/workspace/FinalProject1/aameetinglist.txt'); //Pull in website text
var $ = cheerio.load(content); //loading cheerio content into $

$('table[cellpadding=5]').find('tbody').find('tr').each(function(i, elem) { //pulling info from table with cellpadding 5 which is all the meeting info and running through a loop of all the data

                var meetingsObj = new Object;

                meetingsObj.meetingName = $(elem).find('b').eq(0).text().replace(/\s+/g, ' ').replace(/A.A./g, "AA").replace("Y.E.S.", "YES").replace("(V.O.D.)", "").replace(/\(\)/g, "").replace("&", "and").replace("T&A-", "").replace("@", "at").replace("(:I)", "").replace("(:II)", "").replace("(:i)", "").replace("(:ii)", "").trim();

                meetingsObj.meetingAddress = $(elem).find('td').eq(0).html().split('<br>')[2].trim().replace("@", ",").replace("(", ",").replace(".", ",").replace("-", ",");

                var meetingDetails = [];
                
                meetingDetails = $(elem).find('td').eq(1).html().trim().replace(/>\s*/g, '>').replace(/\s*</g, "<").split("<br><br>"); // fill array with meeting details

                meetingsObj.meetingDetails = meetingDetails;

                meetingsObj.meetingLocation = $(elem).find('h4').eq(0).text().trim().replace('&apos;', "'").replace(/@/g, "at"); // fill array for meeting locations

                meetingsObj.wheelChairAccessable = $(elem).find('span').eq(0).text().trim(); //fill array with wheelchair accessable information

                meetingsObj.meetingAddInfo = $(elem).find('.detailsBox').eq(0).text().trim(); //fill meetingAddInfo with extra info about the meetings

                meetings.push(meetingsObj);
                console.log(meetingsObj);

        }),

        fs.writeFileSync('/home/ubuntu/workspace/FinalProject1/aameetingsData.txt', JSON.stringify(meetings, null, 1));