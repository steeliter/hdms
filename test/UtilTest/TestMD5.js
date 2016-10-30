var crypto = require('crypto');
for(var i=0;i<10;i++){
    userID=i;
    var md5 = crypto.createHash('md5');
    var mima = md5.update(userID.toString()).digest('base64');
    console.log(mima);
}

