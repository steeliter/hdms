var Item = require('../../models/itemModel');


var itemArray = new Array();
for(var i=1;i<317;i++){
    var _item = new Object();
    _item.itemID= i.toString();
    _item.itemName= i.toString();
    _item.itemVersion= i.toString();
    _item.price= i.toString();

    // 使用属性
    _item.department= i.toString();
    _item.dateFactory= i.toString();
    _item.factory= i.toString();
    _item.Country= i.toString();
    _item.dateImport= i.toString();
    _item.dateExport= i.toString();
    _item.dateInstall= i.toString();
    _item.dateUse= i.toString();
    _item.depreciation= i.toString();
    _item.docID= i.toString();
    _item.docLocation= i.toString();
    _item.docContent= i.toString();
    _item.supplierName= i.toString();
    _item.supplierCountry= i.toString();
    _item.supplierCert= i.toString();
    _item.supplierPhone= i.toString();
    _item.supplierAddr= i.toString();
    _item.supplierPostcode= i.toString();
    itemArray.push(_item);
}


function siWithCallback(ele,callback){
    var item = new Item(ele);
    item.save(function(err){
        console.log(err.errmsg);
        callback();
    })
}

var h = require('../../util/functionHelper');
//h.synAFunc(siWithCallback, itemArray, 0, itemArray.length);

function testAddItemSegment(i,end){
    if(i>end){
        console.log('program is end!');
    }else{
        var item=new Item(itemArray[i]);
        item.save(function (err) {
            if(err){
                console.log(err.errmsg);
            }else{
                console.log(item.itemName + ' has been added.');
            }
            process.nextTick(function () {
                return testAddItemSegment(i + 1, end);
            });
        });
    }
}
testAddItemSegment(0, itemArray.length - 1);