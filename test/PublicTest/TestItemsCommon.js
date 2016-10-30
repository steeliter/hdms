var simpleServer = require('../../util/simpleHtmlServer');

var test=require('../../public/javascripts/items/items-common.js');

var props = ["a", "b", "c"];
var json = [{
    name:"david",
    a:"aData",
    b:"bData"
}];
console.log(test.get(json,props));
simpleServer.sserver(test.get(json,props),3998);