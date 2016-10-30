module.exports= function (app) {
    app.get('/', function(req, res, next) {
        res.render('indexPage', { title: '医院设备管理系统',layout:'layout',user:req.session.user});
    });
}