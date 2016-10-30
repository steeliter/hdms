var http = require('http');
var assert = require('assert');

var select=JSON.stringify({itemID:'1'});
var aggre = JSON.stringify({itemName:1});

var opts={
    host:'localhost',
    port:3000,
    path: "/items/get?select="+select+"&aggre="+aggre,
    method:'get',
    headers:{'content-type':'application/x-www-form-urlencoded'}
};


var req=http.request(opts,function(res){
    res.setEncoding('utf8');

    var data = "";
    res.on('data', function (d) {
        data+=d;
    });

    res.on('end', function () {
        console.dir(data);
    });
});

req.on('error', function (e) {
    assert.equal(e,null);
});

// post nothing,it's just a broadcast port
req.end();