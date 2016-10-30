var Item = require('../../models/itemModel');
var assert = require('assert');


var doc ={
    itemID: '219',
    itemName: '219',
    itemVersion: '219',
    price: '219',
    department: '219',
    dateFactory: '219',
    factory: '219',
    Country: '219',
    dateImport: '219',
    dateExport: '219',
    dateInstall: '219',
    dateUse: '219',
    depreciation: '219',
    docID: '219',
    docLocation: '219',
    docContent: '219',
    supplierName: '219',
    supplierCountry: '219',
    supplierCert: '219',
    supplierPhone: '219',
    supplierAddr: '219',
    supplierPostcode: '219',
    _id: { _bsontype: 'ObjectID', id: 'UÐ¤%>(L\u0013ïxk' }
}


var newItem1 = new Item(doc);
//assert.equal(newItem1.itemID, undefined);
console.log(newItem1.itemID);

delete doc._id;
//doc._id = undefined;
var newItem2 = new Item(doc);
//assert.equal(newItem2.itemID,undefined);
console.log(doc);
console.log(doc.itemID);
console.log(newItem2.itemID);

console.log('put into an array');
var itemArray = new Array();
itemArray.push(newItem2);
itemArray.push(newItem1);
console.dir(itemArray);


console.log('get item from array');
var newItem3 = new Item(itemArray);
console.log(newItem3.itemID);
console.log('get item with array index');
var newItem4 = new Item(itemArray[0]);
console.log(newItem4.itemID);
console.log('get item with for-in circle');
var items = new Array();
for(var d in itemArray){
    var _item = new Item(d);
    items.push(_item);
}
console.dir(items);
console.log(items.length);
console.log('get item with for-index circle');
var items2 = new Array();
for(var index=0;index<itemArray.length;index++){
    var _tmp2 = new Item(itemArray[index]);
    items2.push(_tmp2);
}

console.dir(items2);
