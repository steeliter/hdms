/**
 * mongoDB数据连接配置
 */
var settings = require('../mongoDBsettings');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
module.exports = new Db(settings.db, new Server(settings.host, settings.port, {}));
