var Item = require('../../models/itemModel');

var selectJson = {itemID: "30"};


Item.remove(selectJson, function (result) {
    console.dir("删除了" + result.result.n + "行。");
});