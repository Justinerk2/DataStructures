var fs = require("fs"); //call fs
// var async = require('async'); // call async

var meetingObj = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/FinalProject1/aameetingsData.txt')); //Pull in website text

for (var i = 0; i < meetingObj.length; i++) {

    meetingObj[i].cleanMeetingAddress = cleanAddresses(meetingObj[i].meetingAddress);
    meetingObj[i].cleanMeetingName = cleanMeetingNames(meetingObj[i].meetingName);
    meetingObj[i].NumberDay =cleanMeetingDays(meetingObj[i].days);
    meetingObj[i].NumberstartTime = cleanTimes(meetingObj[i].starttimes);
    meetingObj[i].NumberendTime = cleanTimes(meetingObj[i].endtimes);
    console.log(meetingObj[i]);
}

function cleanAddresses(oldAddress) {
    var cleanAddress;
    var cleanAddress1;
    var cleanAddress2;
    cleanAddress1 = oldAddress.replace("58,66", "58-66").replace("W,", "West").replace("E,", "East");
    cleanAddress2 = cleanAddress1.substring(0, cleanAddress1.indexOf(",")).replace('&apos;', "'").replace('&amp;', "and");
    cleanAddress = (cleanAddress2 + ', New York, NY');
    return cleanAddress;
}

function cleanMeetingNames(oldName) {
    var cleanMeetingName;
    var second = oldName.substr(oldName.indexOf('-') + 2);
    var first = oldName.substr(0, oldName.indexOf('-') - 1);
    if (first == second.toUpperCase()) {
        cleanMeetingName = first;
    }
    else if (second == "") {
        cleanMeetingName = first;
    }
    else {
        cleanMeetingName = second.toUpperCase();
    }
    return cleanMeetingName;


}

function cleanMeetingDays(days) {

                    var daysNumb;

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
return daysNumb;

}
function cleanTimes(time){

    var ampm = time.substr(time.length - 2, time.length); //am or pm

    var fulltime = time.split(":"); //seperate minutes and hours
    var hour = parseInt(fulltime[0], 10); // pull out hours
    var mins = parseInt(fulltime[1], 10).trim(); //pull out minutes
    if (ampm == "AM" && hour == "12") {
        var midnight = mins;
        return midnight;
    }
    if (ampm == "AM" && hour < 12) {
       var morningtime = ((hour * 1) * 60) + (mins);
       return(morningtime);
    }
    if (ampm == "PM" && hour === 12) {
       var noon = 720 + mins;
       return noon;
    }
    if (ampm == "PM" && hour < 12) {
        var night = (((hour * 1) + 12) * 60) + (mins);
        return night;
    }
}

function emptyval(value) {
    if (value == "") {
        return "";
    }
    else {
        return value;
    }
}


fs.writeFileSync('/home/ubuntu/workspace/FinalProject1/aameetingsCleanData.txt', JSON.stringify(meetingObj, null, 1));