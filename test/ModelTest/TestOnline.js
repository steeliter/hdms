var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL 
var url = 'mongodb://192.168.169.103:27017/test';
// Use connect method to connect to the Server 
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    db.close();
});