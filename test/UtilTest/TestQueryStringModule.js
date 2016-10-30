var qs = require('querystring');

var s = 'a=1&b=2&c=3';

console.dir(qs.parse(s));


var myObj = {
    'a':1,
    'b':true,
    'c':'cats',
    'd':{
        'd1':'1',
        'd2':'2'
}   ,
    'func':function(){
        console.log('dogs');
    }
};

// 如果属性值不是string,Boolean或number中的一种，它就不能被序列化
console.log(qs.encode(myObj));