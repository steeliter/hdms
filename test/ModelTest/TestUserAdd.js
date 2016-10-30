var User = require('../../models/userModel');

var users = new Array();

for(var i=0;i<10;i++){
    var user=new Object();
    user.userID=i+"";
    user.userPwd="123";
    user.userName="吴洛"+i;
    user.userRole="主任";
    user.userPhone="1347135512"+i
    user.department="医务处";
    users.push(user);
}
for(var i=10;i<100;i++){
    var user=new Object();
    user.userID=i+"";
    user.userPwd="123";
    user.userName="关飞"+i;
    user.userRole="工程师";
    user.userPhone="134713551"+i
    user.department="医学工程科";
    users.push(user);
}
for(var i=100;i<1000;i++){
    var user=new Object();
    user.userID=i+"";
    user.userPwd="123";
    user.userName="赵云"+i;
    user.userRole="技师";
    user.userPhone="13471355"+i
    user.department="普通外科";
    users.push(user);
}


// 重新包装 user.save以便调用synAFunc
function suWithCallback(ele,callback){
    var user = new User(ele);
    user.save(function(err){
        console.log(err);
        //assert.equal(err, null);
        callback();
    });
}

var h = require('../../util/functionHelper');
h.synAFunc(suWithCallback, users, 0, 1000);





