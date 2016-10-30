var mongodb = require('../../models/db.js');

mongodb.open(function(err,db){
    if(!err){
        console.log('connects!');
    }else{
        console.log(err);
    }

    db.collection(mongodb.s.databaseName, function (err, collection) {
        if(err){
            console.log(err);
        }else{
            collection.find(function (err, result) {
                console.log("Test db setting passed.");
            });
        }
    });


    db.close();
});