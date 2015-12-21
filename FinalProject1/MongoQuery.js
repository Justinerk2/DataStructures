var fs = require("fs"); //call fs

var meetings = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/FinalProject1/aameetingsCleanData.txt'));

var collName = 'aameetings';

var today = new Date(); //todays date
var todaynumb = today.getDay(); // pulling the day
var currenttime = today.getHours(); // pulling the current hour time
var currenttimeMins = (currenttime) * 60; //pulling the current time in terms of total minutes;
var endtime = 240; //4am end time
var tomorrow = nextday(today);

var url = 'mongodb://localhost:27017/aameetings'; //url for mongo

var MongoClient = require('mongodb').MongoClient; // npm install mongodb

MongoClient.connect(url, function(err, db) {

            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('collName');
            
            for (var i = 0; i < meetings.length; i++) {
                collection.insert(meetings[i]);
            }
            
            meetings.aggregate([
                {$unwind : "$meeting"},
                
                {  $match: {

                        $or: [{

                                 $and: [{ "meeting.NumberDay": todaynumb },
                { "meeting.NumberstartTime": { $gt: currenttime, $lt: 25 } } 
                ]},
        
                { $and: [{ "meetings.NumberDay": tomorrow },
                { "meetings.NumberendTime": { $gt: -1, $lt: endtime } } 
                ]}
            ]}},

                           
                       { $group: {
                            _id: {
                                meetingName: "$meetings.cleanMeetingName",
                                Address: "$meetings.CleanAddress",
                                Location: "$meetings.Location",
                                details: "$meetings.meetingAddInfo",
                                wheelchairAccess: "$meetings.wheelChairAccessable",
                                Day: "$meetings.meetingDay",
                                DayNum: "$meetings.meetingNumberDay",
                                StartTime: "$meetings.meetingStartTime",
                                EndTime: "$meetings.EndTime",
                                meetingType: "$meetings.meetingType",
                                specialInterest: "$meetings.meetingSpecialInt",
                
                            }
                        },
                    }
                ]).toArray(function(err, aameetings) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log(aameetings);
                    }
                    db.close();
                })

            }); //MongoClient.connect
            
            
function nextday(day){
if (today <6){
    return today.getDay() + 1;
}
else{
    return 0; //when its saturday, bringing it back to sunday
}
}