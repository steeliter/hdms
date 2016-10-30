var assert = require('assert');
var check=require('../../util/check');

// 删除集合
function docdrop(db,docName,callback){
    db.open(function (connected, db) {
        assert(true, connected);
        dropCollectionInner(db,docName,function(result){
            callback(result);
            db.close(function(){
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
function insert(db,docName,dataJson,keyJson,indexOptionJson,callback){
    db.open(function (connected, db) {
        assert(true, connected);
        insertDocuments(db,docName,dataJson,keyJson,indexOptionJson,function(err,callback) {
            //callback(result);
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
            }
            else
            {
                assert.equal(1, result.result.n);
                assert.equal(1, result.ops.length);
            }
        }
        callback(result);
    });
}

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
        callback(docs);
    });
}



exports.select=select;
exports.insert=insert;
exports.update=update;
exports.remove=remove;
exports.docdrop=docdrop;
exports.deindex=deindex;