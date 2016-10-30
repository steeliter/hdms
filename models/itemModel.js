var mongodb = require("./db");
var storageName = 'items';
var assert = require('assert');


// test
var indexJson = {itemID:1};
var indexOptionJson = {"unique": true};

// 构造函数
function Item(_item){
    this.itemID=_item.itemID;
    this.itemName=_item.itemName;
    this.itemVersion=_item.itemVersion;
    this.price=_item.price;

    // 使用属性
    this.department=_item.department;
    this.dateFactory=_item.dateFactory;
    this.factory=_item.factory;
    this.Country=_item.Country;
    this.dateImport=_item.dateImport;
    this.dateExport=_item.dateExport;
    this.dateInstall=_item.dateInstall;
    this.dateUse=_item.dateUse;
    this.depreciation=_item.depreciation;
    this.docID=_item.docID;
    this.docLocation=_item.docLocation;
    this.docContent=_item.docContent;
    this.supplierName=_item.supplierName;
    this.supplierCountry=_item.supplierCountry;
    this.supplierCert=_item.supplierCert;
    this.supplierPhone=_item.supplierPhone;
    this.supplierAddr=_item.supplierAddr;
    this.supplierPostcode=_item.supplierPostcode;

}

// 注册
Item.prototype.save = function (callback) {
    var newItem = {
        itemID:this.itemID,
        itemName:this.itemName,
        itemVersion:this.itemVersion,
        price:this.price,

        // 使用属性
        department:this.department,
        dateFactory:this.dateFactory,
        factory:this.factory,
        Country:this.Country,
        dateImport:this.dateImport,
        dateExport:this.dateExport,
        dateInstall:this.dateInstall,
        dateUse:this.dateUse,
        depreciation:this.depreciation,
        docID:this.docID,
        docLocation:this.docLocation,
        docContent:this.docContent,
        supplierName:this.supplierName,
        supplierCountry:this.supplierCountry,
        supplierCert:this.supplierCert,
        supplierPhone:this.supplierPhone,
        supplierAddr:this.supplierAddr,
        supplierPostcode:this.supplierPostcode

    };
    mongodb.open(function (err, db) {
        if (err) {
            mongodb.close();
            return callback(err);
        }

        db.collection(storageName,function(err,collection){
            if (err) {
                mongodb.close();
                return callback(err);
            }

            // itemID 是唯一标识符
            collection.ensureIndex(indexJson, indexOptionJson);

            // 保存
            collection.insert(newItem, indexOptionJson, function (err, addedItem) {
                callback(err, addedItem);
                mongodb.close();
            });
        });
    });
};

// 查找
/*
 按照选择条件（selectJson)和聚合条件(aggreJson)来返回一组item。这个item也就是callback的回调参数。
 * */
Item.select = function findDocument(selectJson, aggreJson, docOpCallback) {
    mongodb.open(function (err, db) {
        // 断言：数据库连接有效
        assert.notEqual(db, undefined);
        var collection = db.collection(storageName);

        collection.find(selectJson, aggreJson).toArray(function (err, docs) {
            if (err) {
                console.log('select error: ' + err);
            }
            else {
                var retItems = [];
                for (var index = 0; index < docs.length; index++) {
                    retItems.push(new Item(docs[index]));
                }
                docOpCallback(err, retItems);
            }
            db.close();
        });
    });
};

// 编辑
/*
 callback调用的参数中，result.result.n表示了受影响的行数
 当selectJson可以选择多个对象时，这个行数依然是1，表示首选的一行
 * */
Item.update = function updateDocument(selectJson, updateJson, callback) {
    mongodb.open(function (err, db) {
        // 断言：数据库连接有效
        assert.notEqual(db, undefined);
        var collection = db.collection(storageName);
        collection.update(selectJson, updateJson, function (err, result) {
            //assert.equal(err,null);
            //assert.equal(1,result.result.n);
            if (err) console.log('update error:' + err.errmsg);
            callback(result);
            db.close();
        });

    });
};

// 删除
/*
 当需要删除的doc存在的时候，callback调用的参数result中包含了受影响的行数
 当需要删除的doc不存在的时候，这个行数为0
 * */
Item.remove = function removeDocument(selectJson, callback) {
    mongodb.open(function (err, db) {
        // 断言：数据库连接有效
        assert.notEqual(db, undefined);
        var collection = db.collection(storageName);
        collection.remove(selectJson, function (err, result) {
            console.log('remove error: ' + err.errmsg);
            callback(result);
            db.close();
        });
    });
};

module.exports=Item;
