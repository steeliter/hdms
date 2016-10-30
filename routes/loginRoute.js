var crypto=require('crypto');
var User = require('../models/userModel');

module.exports=function(app){
    app.get('/loginPage', checkNotLogin);
    app.get('/loginPage', function(req, res) {
        res.render('loginPage', {
            title: '用户登入',
            user: req.session.user
        });
    });
    app.post('/loginPage', checkNotLogin);
    app.post('/loginPage', function(req, res) {
//	生成口令的散列值
        console.log('!!to login :{'+req.body["user_id"]+','+req.body["user_pwd"]+'}');
        var md5 = crypto.createHash('md5');
        var mima = md5.update(req.body["user_pwd"].toString()).digest('base64');
        var conditions={"userID":req.body["user_id"]};
        console.log(conditions);
        User.getOne(conditions, function(err, gotUser) {
            if (!gotUser) {
                req.flash('error', '用户不存在');
                return res.redirect('/loginPage');
            }
            if (gotUser.userPwd != mima) {
                req.flash('error', '用户口令错误');
                return res.redirect('/loginPage');
            }
            req.session.user = gotUser;
            req.flash('success', '登入成功');
            res.redirect('/');
        });
    });
    app.get('/logout', checkLogin);
    app.get('/logout', function(req, res) {
        req.session.user = null;
        req.flash('success', '登出成功');
        res.redirect('/');
    });

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
}