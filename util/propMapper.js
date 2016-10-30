function  propMap(obj,table,objOnTableRight){
    var ret={};
    for(var p in table){
        if(objOnTableRight){
            ret[p] = obj[table[p]];
        }else{
            ret[table[p]] = obj[p];
        }
    }
    return ret;
}
exports.propTableMap = propMap;