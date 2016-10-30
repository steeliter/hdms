var assert = require('assert');
var check=require('../../util/check');
var Db = require('../../models/db');
var data1=[
    {a : '1 in g',b:1}, {a : '2 in g',b:2}, {a : '3 in g',b:3}
];
var data2 = {a: "999"};
var docName='testdocuments';


///doSomeTestHere

//deindex(Db, docName, {"a": 1});
//remove(Db, docName, {a:"999"});
//remove(Db, docName, {});
//dropCollectionInner(Db, docName,function(result){
//    console.log('Is doc droped? ['+result+']');
//});
//update(Db, docName,{a: 2}, {$set: {b: 1}});
//select(Db, docName, {},function(docs){
//    console.dir(docs);
//});
//test ends


//insert(Db, docName, data1,{},{},function(ret){
//    console.log("return: " + ret.result.n);
//}); //无索引地插入
insert(Db,docName,data1,{a:1},{unique:true},function(result){
    console.log(result.result.n);
}); // 有索引地插入

function insert(db,docName,dataJson,keyJson,indexOptionJson,callback){

    db.open(function (connected, db) {
        assert(true, connected);
        console.log("Connected correctly to server");
        insertDocuments(db,docName,dataJson,keyJson,indexOptionJson,function(result) {
            callback(result);
            //console.log(result);
            db.close();
        });
    });
}
var insertDocuments = function(db,docName,dataJson,keyJson,indexOptionJson,callback) {
    // Get the documents collection
    var collection = db.collection(docName);
    collection.ensureIndex(keyJson,indexOptionJson);
    // Insert some documents
    collection.insert(dataJson, function(err, result) {
        if(!err){
            if(check.isArray(dataJson)){
                assert.equal(dataJson.length, result.result.n);
                assert.equal(dataJson.length, result.ops.length);
                console.log("Inserted "+dataJson.length+" documents into the document collection");
            }
            else
            {
                assert.equal(1, result.result.n);
                assert.equal(1, result.ops.length);
                console.log("Inserted "+1+" documents into the document collection");
            }
        }
        console.log(err);
        callback(result);
    });
}

// 删除集合
function docdrop(db,docName,callback){
    db.open(function (connected, db) {
        assert(true, connected);
        //console.log('成功连接到数据库');
        dropCollectionInner(db,docName,function(result){
            callback(result);
            db.close(function(){
                //console.log('数据库连接已经关闭。');
            });
        })
    });
}
 var dropCollectionInner=function(db,docName,callback){

    db.dropCollection(docName, function (err, result) {
        assert(true, err);
        callback(result);
    });
}

// 删除索引
function deindex(db,docName,keyJson){
    db.open(function (connected, db) {
        assert(true, connected);
        dropIndexInner(db,docName,keyJson,function(){
            db.close();
        })
    });
}
var dropIndexInner =function(db,docName,keyJson,callback){
    var collection=db.collection(docName);
    collection.dropIndex(keyJson,function(err,result){
        assert(true, err);
        callback(result);
    })
}

// 添加数据


// 删除数据
function remove(db,docName,conditionJson){
    db.open(function (connected, db) {
        assert(true, connected);
        removeDocument(db, docName, conditionJson,function(){
            db.close();
        });
    });
}
var removeDocument= function (db,docName,conditionJson,callback) {
    var collection = db.collection(docName);
    collection.remove(conditionJson,function(err,result){
        assert.equal(err,null);
        //console.log('影响了'+result.result.n+'行')
        callback(result);
    })
}

// 更新一条数据
function update(db,docName,selectJson,updateJson){
    db.open(function (connected, db) {
        assert(true, connected);
        updateDocument(db, docName, selectJson, updateJson, function () {
            db.close();
        });
    });
}
var updateDocument = function(db,docName,selectJson,updateJson, callback) {
    // Get the documents collection
    var collection = db.collection(docName);
    // Update document where a is 2, set b equal to 1
    collection.update(
        selectJson,updateJson, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            callback(result);
        });
}

// 筛选一个数组
function select(db,docName,selectJson,aggreJson,callback){
    db.open(function (err, db) {
        assert(true, err);
        findDocuments(db,docName,selectJson,aggreJson, function (docs) {
            callback(docs);
            db.close();
        });

    });
}
var findDocuments = function(db,docName,selectJson ,aggreJson,callback) {
    // Get the documents collection
    var collection = db.collection(docName);
    // Find some documents
    collection.find(selectJson,aggreJson).toArray(function(err, docs) {
        assert.equal(err, null);
        //assert.equal(2, docs.length);
        //console.log("Found the following records");
        //console.dir(docs);
        callback(docs);
    });
}



exports.select=select;
exports.insert=insert;
exports.update=update;
exports.remove=remove;
exports.docdrop=docdrop;
exports.deindex=deindex;