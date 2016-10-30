var Item = require('../../models/itemModel');

var selectJson = {itemID: "37"};
var updateJson = {$set: {b: 23}};


Item.update(selectJson, updateJson, function (result) {
    console.dir(result.result.n);
});