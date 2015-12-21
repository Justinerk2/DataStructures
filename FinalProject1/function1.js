var test = [
   "<b>Wednesdays From</b>9:15 PM<b>to</b>10:15 PM<br><b>Meeting Type</b>C = Closed Discussion meeting<br><b>Special Interest</b>As Bill Sees It",
   "<b>Thursdays From</b>9:15 PM<b>to</b>10:15 PM<br><b>Meeting Type</b>S = Step meeting",
   "<b>Fridays From</b>9:15 PM<b>to</b>10:15 PM<br><b>Meeting Type</b>S = Step meeting",
   "<b>Saturdays From</b>9:15 PM<b>to</b>10:15 PM<br><b>Meeting Type</b>C = Closed Discussion meeting",
   "<b>Sundays From</b>9:15 PM<b>to</b>10:15 PM<br><b>Meeting Type</b>OD = Open Discussion meeting<br><b>Special Interest</b>Beginners Workshop",
   "<b>Mondays From</b>9:15 PM<b>to</b>10:15 PM<br><b>Meeting Type</b>BB = Big Book meeting",
   "<b>Tuesdays From</b>9:15 PM<b>to</b>10:30 PM<br><b>Meeting Type</b>S = Step meeting<br><b>Special Interest</b>Meditation",
   ""
  ];
  
var testarray = cleanIndivMeetings(test);

function cleanIndivMeetings (meetingDeets) {

var toOutput = meetingDeets; 
  
for (var i = 0; i < meetingDeets.length - 1; i++) {
    console.log(meetingDeets[i].split('</b>'));
}

return toOutput; 
}
// console.log(testarray);