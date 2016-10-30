var http = require('http');
var assert = require('assert');

var opts={
    host:'localhost',
    port:3000,
    path:'/',
    method:'GET',
    headers:{'content-type':'application/x-www-form-urlencoded'}
};


var req=http.request(opts,function(res){
    res.setEncoding('utf8');

    var data = "";
    res.on('data', function (d) {
        data+=d;
    });

    res.on('end', function () {
        //assert.strictEqual(data,'');
        console.log(data);
    });
});

req.on('error', function (e) {
    assert.equal(e,null);
});

req.end();