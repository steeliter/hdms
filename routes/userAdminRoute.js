var express = require('express');
var crypto=require('crypto');
var router = express.Router();
var User=require('../models/userModel');
module.exports=function(app){

    // 查询用户的管理界面
    app.get('/users', checkLogin);
    app.get('/users', function(req, res) {
        res.render('userAdminPage', {title: '用户管理'});
    });

    // 查询用户
    app.post('/users/search', checkLogin);
    app.post('/users/search', function (req, res) {
        var params=parseQuery(req,false);
        //console.log("get params:"+params.conditions.$and);
        User.get(params, function(err, users) {
            if (err) {
                res.json({'error':err});
                return;
            }
            var pager=new Object();
            pager["results"]=users;
            pager["page"]=params.dbPager.page;
            pager["pagesize"]=params.dbPager.pagesize;
            //console.log(pager);
            User.getRows(params.conditions,function(err,count){
                //console.log(count);
                pager["rowsCount"]=count;
                //console.log(pager);
                res.json(pager);
            });
        });
    });
    app.post('/users/delete', checkLogin);
    app.post('/users/delete', function (req, res) {
    	if(!req.body.id){
    		res.json({'error':"不当操作，删除失败"});
    		return;
    	}
    	if(req.body.id.trim()===""){
    		res.json({'error':"不当操作，删除失败"});
    		return;
    	}
    	var conditions=new Object();
    	var ids=req.body.id.split(",");
    	conditions["userID"]={"$in":ids};
    	console.log(conditions);
    	User.del(conditions,function(err,r){
    		if(err){
    			res.json({'error':err});
    			return;
    		}
    		res.json({'success':r});
    	});
    });
    app.post('/users/get', checkLogin);
    app.post('/users/get', function (req, res) {
    	if(!req.body.id){
    		res.json({'error':"不当操作，删除失败"});
    		return;
    	}
    	if(req.body.id.trim()===""){
    		res.json({'error':"不当操作，删除失败"});
    		return;
    	}
    	var conditions=new Object();	
    	conditions["userID"]=req.body.id.trim();
    	User.getOne(conditions,function(err,user){
    		if(err){
    			res.json({'error':err});
    			return;
    		}
    		res.json({'success':"ok","user":user});
    	});
    });
    app.post('/users/update', checkLogin);
    app.post('/users/update', function (req, res) {
    	var user=parseQuery(req,true);
    	User.update(user,function(err,user){
    		if(err){
    			res.json({'error':err});
    			return;
    		}
    		res.json({'success':"ok","user":user});
    	});
    });
}
function parseQuery(req,isUpdate){
    var userFieldDic={};
    userFieldDic["id"]="userID";
    userFieldDic["name"]="userName";
    userFieldDic["dept"]="department";
    userFieldDic["role"]="userRole";
    userFieldDic["phone"]="userPhone";
    userFieldDic["pwd"]="userPwd";
    
    var conditions={};
    //如果是更新请求，将参数封装成user
    if(isUpdate){
    	for(var c in req.body){
            var p=req.body[c];
            conditions[userFieldDic[c]]=p;
        }
    	return conditions;
    }
    var params={};
    var dbPager={};
    dbPager["page"]=1;
    dbPager["pagesize"]=10;
    var conditionArray=[];
    for(var c in req.body){
        var condition={};
        var p=req.body[c];
        switch(c){
            case "id":
            case "name":
                if(p!=""){
                    var pattern = new RegExp(p);
                    condition[userFieldDic[c]]=pattern;
                }
                else{
                    condition=null;
                }
                break;
            case "dept":
            case "role":
                condition[userFieldDic[c]]=p;
            case "page":
                dbPager["page"]=parseInt(p)?parseInt(p):1;
            case "pagesize":
                dbPager["pagesize"]=parseInt(p)?parseInt(p):10;
            default:
                break;
        }
        if(condition!=null)conditionArray.push(condition);
    }
    if(conditionArray.length>1)conditions["$and"]=conditionArray;
    if(conditionArray.length==1)conditions=conditionArray.pop();
    params["conditions"]=conditions;
    params["dbPager"]=dbPager;
    //console.log(conditions);
    //console.log(dbPager);

    return params;
}
function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登入');
        return res.redirect('/loginPage');
    }
    next();
}
function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登入');
        return res.redirect('/');
    }
    next();
}