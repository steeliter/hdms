var mapper = require('../../util/propMapper');
var table={"a":"a_1",
            "b":"b_1"
};


var obj = {a:1,b:2,c:3};

console.dir(mapper.propTableMap(obj,table,false));