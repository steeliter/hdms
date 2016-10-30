module.exports= function (app) {
    app.get('/test', function (req, res) {
        res.send("This is a test page from express.");
    });

    app.get('/dev',function(req,res){
        res.render('blank',{
            title:"正在建设中"
        });
    });
}