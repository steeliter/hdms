//数据库支持
var MongoStore = require('connect-mongo');
//var settings = require('./mongoDBsettings');
//express模板支持
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var routes = require('./routes');

var app = express();
//使用layout模板
//var expressLayouts = require('express-ejs-layouts');
//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.set('layout', 'layout') ;// defaults to 'layout'     

//app.use(expressLayouts);
//uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
/*app.use(express.session({
	secret: settings.cookieSecret,
	store: new MongoStore({
		db: settings.db
	})
}));*/
app.use(session({
	secret: 'hdms',
	name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
	cookie: {maxAge: 30000000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
	resave: false,
	saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());



//视图助手，实现不同登录状态下页面呈现不同内容的功能
app.use(function(req,res,next){
	  res.locals.user=req.session.user;

	  var err = req.flash('error');
	  var success = req.flash('success');

	  res.locals.error = err.length ? err : null;
	  res.locals.success = success.length ? success : null;
	   
	  next();
	});



routes(app);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//error handlers

//development error handler
//will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('errorPage', {
			message: err.message,
			error: err
		});
	});
}




//production error handler
//no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('errorPage', {
		message: err.message,
		error: {}
	});
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});
//module.exports = app;
//console.log("程序启动");
