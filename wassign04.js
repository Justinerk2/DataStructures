var request = require('request'); // npm install request
var fs = require('fs'); // nmp instal fs

var aameetings = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/data/geocodeMeetings.txt'));
    // Connection URL
    var url = 'mongod://localhost:27017/aameetings';

    // Retrieve
    var MongoClient = require('mongodb').MongoClient; // npm install mongodb

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}

        var collection = db.collection('aameetings');

        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        for (var i=0; i < aameetings.length; i++) {
            collection.insert(aameetings[i]);
            }
        db.close();

    }); //MongoClient.connect