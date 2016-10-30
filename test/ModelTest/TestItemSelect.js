var Item = require('../../models/itemModel');

var idArray = new Array();
for(i=1;i<350;i++){
    idArray.push(i.toString());
}

function testGetItemById(i,end){
    if(i>end){
        console.log("That's the end!");
    }else{
        Item.select({itemID:idArray[i]},{},function(err,retItems){

            // 打印信息
            if(err){
                console.log(err);
            }

            if(retItems){
                console.dir(retItems.length);
            }else{
                console.log(idArray[i]+' returns nothing');
            }

            // 进一步递归
            process.nextTick(function(){
                return testGetItemById(i+1,end);
            });
        })
    }
}
testGetItemById(0,idArray.length-1);