// 在指定端口新建一个html服务器
var Http = require('http');

function sserver(html,port){
    var server = Http.createServer(function (req, res) {
        res.writeHead({
            'Content-Type':'text/html'
        });
        res.end(html);
    });
    server.listen(port);
    console.log('server listen at '+port);
}

//sserver("<p>hello</p>",3999);

exports.sserver = sserver;