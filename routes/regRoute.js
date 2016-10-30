var crypto=require('crypto');
var User=require('../models/userModel');

module.exports= function (app) {
    app.get('/regPage', function(req, res) {
        res.render('regPage', {title: '用户注册',	user:req.session.user});
    });

    app.post('/regPage', function(req, res) {
        //检验用户两次输入的口令是否一致
        if (req.body['user_pwd_repeat'] != req.body['user_pwd']) {
            req.flash('error', '两次输入的口令不一致');
            return res.redirect('/regPage');
        }
        //生成口令的散列值
        var md5 = crypto.createHash('md5');
        var pwd = md5.update(req.body.user_pwd).digest('base64');
        var usr = new User({
            userID:req.body.user_id,
            userPwd: pwd,
            userName: req.body.user_name,
            userRole:req.body.user_role,
            userPhone:req.body.user_phone,
            department:req.body.department
        });
        console.log(usr);
        //检查用户名是否已经存在
        User.getOne({"userID":usr.userID}, function(err, u) {
            if (u){
                err = '帐号 '+u.userName+' 已经存在';
            }
            if (err) {
                //console.log(err);
                req.flash('error', err);
                return res.redirect('/regPage');
            }
            //console.log("用户已存在");
            //如果不存在则新增用户
            usr.save(function(err) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/regPage');
                }
                req.session.user = usr;
                req.flash('success', '注册成功');
                res.redirect('/');
            });
        });
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

