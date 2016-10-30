var queryString = require('querystring');
var Item = require('../models/itemModel');

module.exports=function(app){
    app.all('/items',function(req,res,next){
        console.log(req.user);
        next();
    });


    // 搜索设备页面
    app.get('/items',function(req,res){
        res.render('myitems',
            {
                title:"设备信息"
            });
    });


    // 添加设备页面
    app.get('/newItemPage', function (req, res) {
        res.render('newItemPage',
            {
                title: "添加设备信息"
            });
    });

    // 回显port，主要用来测试数据传递的情况哒~
    app.get('/items/echo/:action',function(req,res){
        var param = req.params.action;
        res.json(req[param]);
    });

    // 样例数据接口
    app.get('/items/sample',function(req,res){
        var fs = require('fs');
        var rawData=fs.readFileSync('test/TestData/sample.json');
        var sampleData = JSON.parse(rawData);
        res.json(sampleData);
    });

    // ejs测试视图
    app.get('/items/listsample',function(req,res){
        var fs = require('fs');
        var rawData=fs.readFileSync('test/TestData/sample.json');
        var sampleData = JSON.parse(rawData);
        res.render('itemlist',{
            data:sampleData
        });
    });

    app.post('/items/sample',function(req,res){
        var fs = require('fs');
        var rawData=fs.readFileSync('test/TestData/sample.json');
        var sampleData = JSON.parse(rawData);
        res.json(sampleData);
    });

    // REST API
    //
    app.get('/items/get',function(req,res){
        //res.json(req.params);
        var requestJson = req.query;
        console.log(requestJson);
        var selectJson = {};
        var aggreJson = {};
        if(requestJson['select']){
            selectJson = JSON.parse(req.query['select']);
            console.dir(selectJson);
        }
        if(requestJson['aggre']){
            aggreJson = JSON.parse(req.query['aggre']);
            console.dir(aggreJson);
        }


        //var item = new Item(requestJson);
        //console.dir(item);
        Item.select(selectJson,aggreJson,function(err,data){
            res.json(data);
        });
    });
    app.post('/items/post',function(req,res){
        res.json();
    });
    app.post('/items/put',function(req,res){

    });
    app.post('items/delete',function(req,res){

    });

}

