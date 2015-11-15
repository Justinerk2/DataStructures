var request = require("request"); //call request
var fs = require("fs"); //call fs
var async = require("async"); //call async

var aameetings = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/Assignment5_6/DataMeet.txt'));
    // Connection URL
    var url = 'mongodb://localhost:27017/aameetings';

    // Retrieve
    var MongoClient = require('mongodb').MongoClient; // npm install mongodb

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}

        var collection = db.collection('aameetings');

        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        for (var i=0; i < aameetings.length; i++) {
            collection.insert(aameetings[i]);
            }
            aameetings.aggregate([{$match : { meetingDay: "Tuesdays"}},{ $match: {$or: [ { meetingTimes: { $gt: 7, $lt: 90 }} ].toArray(function(err,docs) {
            if (err) {console.log(err)}
            else{
                console.log(docs);
            }
        db.close();
            })

    }); //MongoClient.connect