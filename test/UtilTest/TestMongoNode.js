/**
 * mongoDB数据连接配置
 */
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var db= new Db('local', new Server('192.168.169.102',27017, {}));

db.open(function(err,db){
	if(err){
		console.log(err);
	}else{
		console.log('sucess');
	}
	db.close();
});
