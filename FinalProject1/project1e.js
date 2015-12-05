var request = require('request'); //call request
var fs = require('fs'); // call fs

request('http://www.nyintergroup.org/meetinglist/meetinglist.cfm?searchstr=&Search=Search&borough=M&zone=Zone&zipcode=Zip+Code&day=&StartTime=&EndTime=&meetingtype=&SpecialInterest=', function (error, response, body) { //request html data
  if (!error && response.statusCode == 200) { //if no error write file
    fs.writeFileSync('/home/ubuntu/workspace/FinalProject1/aameetinglist.txt', body);
  }
  else {console.error('Error')} //display request failed if error
});