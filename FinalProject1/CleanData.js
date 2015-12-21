var fs = require("fs"); //call fs
// var async = require('async'); // call async

var meetingObj = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/FinalProject1/aameetingsData.txt')); //Pull in website text

for (var i = 0; i < meetingObj.length; i++) {

    meetingObj[i].cleanMeetingAddress = cleanAddresses(meetingObj[i].meetingAddress);
    meetingObj[i].cleanMeetingDetails = cleanMeetingDet(splitDet(meetingObj[i].meetingDetails));
    meetingObj[i].cleanMeetingName = cleanMeetingNames(meetingObj[i].meetingName);
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

function splitDet(details) {

    for (var i = 0; i < details.length - 1; i++) {

        var splitdetails = details[i].split("</b>").toString();

        return splitdetails
    }
}

function cleanMeetingDet(details) {
    for (var j = 0; j < details.length - 1; i++) {
        var days = details[1].substr(0, details[1].indexOf("From")).replace("<b>", "");
        if (days != "s") {
            var starttimes = details[2].substr(0, details[2].indexOf('<')).trim();
            var endtimes = details[4].substr(0, details[4].indexOf('<')).replace(",", "").trim();
            var type = details[6].substr(0, details[6].indexOf('<')).replace(/"/g, "").replace(",", "").trim();
            for (var l = 1; l < details.length; l++) {
                if (details[l].substr(0, 7) === "Special") {
                    if (details[l + 1]) {
                        var specInt = details[l + 1].replace(",", "").replace("<", "").trim();
                    }


                    // if (days == 'Sundays') {
                    //     days = 'Sundays';
                    //     daysNumb = 0;
                    // }
                    // else if (days == 'Mondays') {
                    //     days = 'Mondays';
                    //     daysNumb = 1;
                    // }
                    // else if (days == 'Tuesdays') {
                    //     days = 'Tuesdays';
                    //     daysNumb = 2;
                    // }
                    // else if (days == 'Wednesdays') {
                    //     days = 'Wednesdays';
                    //     daysNumb = 3;
                    // }
                    // else if (days == 'Thursdays') {
                    //     days = 'Thursdays';
                    //     daysNumb = 4;
                    // }
                    // else if (days == 'Fridays') {
                    //     days = 'Fridays';
                    //     daysNumb = 5;
                    // }
                    // else if (days == 'Saturdays') {
                    //     days = 'Saturdays';
                    //     daysNumb = 6;
                    // }

                    // meetingObj.meetingDay = days;

                    // meetingObj.meetingDayNumb = daysNumb;

                    // meetingObj.meetingStartTime = starttimes;

                    // meetingObj.meetingEndTime = endtimes;

                    // meetingObj.meetingType = type;

                    // meetingObj.meetingSpecialInt = specInt;

                }

            }
        }

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