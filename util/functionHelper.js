exports.makeFunc=function makeFunc() {
    var args = Array.prototype.slice.call(arguments);
    // 首位是函数名称
    var func = args.shift();
    return function() {
        return func.apply(null,   args.concat(Array.prototype.slice.call(arguments)));};
}

exports.synAFunc=function synAFunc(funcWrapperWithCallback,dataArray,start,end){
    if(start<end){

        funcWrapperWithCallback(dataArray[start], function () {
            process.nextTick(function () {
                return synAFunc(funcWrapperWithCallback, dataArray, start + 1, end);
            });
        });
        //process.nextTick(function(){
        //    funcWithCallback(dataArray[start]);
        //    return synAFunc(funcWithCallback, dataArray, start + 1, end);
        //});
    }
}