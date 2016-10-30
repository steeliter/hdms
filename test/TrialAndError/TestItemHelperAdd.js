var dataArray = new Array();
for(var i=1;i<10;i++){
    dataArray.push(i.toString());
}


var clWithCallback=function(ele,callback){
    console.log(ele.toString());
    callback();
}

//synAFunc(clWithCallback, dataArray, 0, dataArray.length);





function synAFunc(funcWithCallback,dataArray,start,end){
    if(start<end){

        funcWithCallback(dataArray[start], function () {
            process.nextTick(function () {
                return synAFunc(funcWithCallback, dataArray, start + 1, end);
            });
        });
        //process.nextTick(function(){
        //    funcWithCallback(dataArray[start]);
        //    return synAFunc(funcWithCallback, dataArray, start + 1, end);
        //});
    }
}




exports.synAFunc= synAFunc;