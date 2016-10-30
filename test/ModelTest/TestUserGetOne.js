var User = require('../../models/userModel');

var users=new Array();


for(var i=0;i<10;i++){
    var user=new Object();
    //if(i % 2 == 0){
    //    user.userID=i;
    //}else{
    //    user.userID='none-'+i;
    //}
    user.userID=i;
    user.userPwd="123";
    user.userName="吴洛"+i;
    user.userRole="主任";
    user.userPhone="1347135512"+i
    user.department="医务处";
    users.push(user);
}


for(var i=10;i<100;i++){
    var user=new Object();
    //if(i % 2 == 0){
    //    user.userID=i;
    //}else{
    //    user.userID='none-'+i;
    //}
    user.userID=i;
    user.userPwd="123";
    user.userName="关飞"+i;
    user.userRole="工程师";
    user.userPhone="134713551"+i
    user.department="医学工程科";
    users.push(user);
}
for(var i=100;i<1000;i++){
    var user=new Object();
    if(i % 2 == 0){
        user.userID=i;
    }else{
        user.userID='none-'+i;
    }
    //user.userID=i;
    user.userPwd="123";
    user.userName="赵云"+i;
    user.userRole="技师";
    user.userPhone="13471355"+i
    user.department="普通外科";
    users.push(user);
}



function testUserGetOneByName(i,end){
    if(i>end){
        console.log('program is end!');
    }else{
        var user=new User(users[i]);
        User.getOne({'userID':user.userID},function(err,u){

            process.nextTick(function () {
                if(u){
                    console.log('.. id '+u.userID+ ' exists in db.')
                }else{
                    console.log('++ id '+ user.userID+' available.')
                }

                return testUserGetOneByName(i+1,end);
            });

        })
    }
}
testUserGetOneByName(0,users.length-1);

