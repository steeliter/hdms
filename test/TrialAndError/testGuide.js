var g = require('mohelper');

var Db = require('../../models/db');
var data1=[
    {a : '1 in tg'}, {a : '2 in tg'}, {a : '3 in tg'}
];
var data2 = {a: "999"};
var docName='testdocuments';

/****unpassed*/
g.insert(Db,docName,data1,{},{},function(result){
    console.log(result.result.n);
});
//g.insert(Db, docName, data2, {a: 1}, {unique: true});

//savemodel();
//function savemodel(callback){
//    g.insert(Db,docName,data1,{},{},function(err){
//        console.log(err);
//        callback(err);
//    })
//}



/*passed*/
//g.select(Db, docName, {a:"999"}, {},function (docs) {
//    console.dir(docs);
//});
//g.select(Db, docName, {a:{$gte:2}},{}, function (docs) {
//    console.dir(docs);
//});

/*passed*/
//g.remove(Db, docName, {a: 2});


/*passed*/
//g.update(Db, docName, {a: {$gte:2}}, {$set: {b: 'updated'}});

/*passed*/
//g.docdrop(Db,docName,function(result) {
//    console.log('Is doc['+docName+'] droped? ['+result+']');
//})
