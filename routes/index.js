var homeRoute = require('./homeRoute');
var loginRoute = require('./loginRoute');
var regRoute = require('./regRoute');
var itemRoute = require('./itemRoute');
var userAdminRoute = require('./userAdminRoute');


var blank = require('./blank');


module.exports=function(app){
    homeRoute(app);
    loginRoute(app);
    regRoute(app);
    itemRoute(app);
    userAdminRoute(app);


    blank(app);
}