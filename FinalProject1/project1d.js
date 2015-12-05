var fs = require("fs"); //call fs

var meetings = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/FinalProject1/aameetingsMeetings.txt'));
var url = 'mongodb://localhost:27017/aameetings'; //url for mongo
var MongoClient = require('mongodb').MongoClient; // npm install mongodb

MongoClient.connect(url, function(err, db) {
       
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('aameetings');
            for (var i = 0; i < aameetings.length; i++) {
                collection.insert(aameetings[i]);
            }
            aameetings.aggregate([{
                    $match: {

                        $or: [{

                                $and: [{
                                    meetingDay: "Tuesdays"
                                }, {
                                    meetingStartTime: {
                                        $gt: 19,
                                        $lt: 0
                                    }
                                }]
                            },

                            {
                                $and: [{
                                    meetingDay: "Wednesdays"
                                }, {
                                    meetingStartTime: {
                                        $gt: 0,
                                        $lt: 19
                                    }
                                }]
                            }
                        ],
                        { $group : {  _id : { 
            meetingName : "$meetingName",
            meetingAddress : "$meetingAddress",
            meetingLocation: "$meetingLocation"
            directions : "$directions",
            details : "$details",
            meetingAccess : "$meetingAccess",
            latLong : "$latLong"
        }, 
            meetingDay : { $push : "$meeting.meetingDay" },
            meetingDayNum : { $push : "$meeting.meetingDayNumb" },
            meetingStartTime : { $push : "$meeting.meetingStartTime" },
            meetingEndTime : { $push: "$meetingEndTime"
            meetingType : { $push : "$meeting.meetingType" },
            specialInterest : { $push : "$meeting.meetingSpecialInt" }
        }},
                    }
                }].toArray(function(err, aameetings) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log(aameetings);
                    }
                    db.close();
                })

            }); //MongoClient.connect