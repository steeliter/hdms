var mongodb = require('./db');
function User(user) {
	this.userID=user.userID;
	this.userPwd=user.userPwd;
	this.userName=user.userName;
	this.userRole=user.userRole;
	this.userPhone=user.userPhone;
	this.department=user.department;
}
module.exports = User;
User.prototype.save = function(callback) {
//	存入 Mongodb 的文档
	var user = {
		userID:this.userID,
		userPwd: this.userPwd,
		userName: this.userName,
		userRole:this.userRole,
		userPhone:this.userPhone,
		department:this.department
	};
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
//		读取 users 集合
		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
//			为 name 属性添加索引
			collection.ensureIndex('userID', {unique: true});
//			写入 user 文档
			collection.insert(user, {safe: true}, function(err, user) {
				mongodb.close();
				callback(err, user);
			});
		});
	});
};
User.getOne = function(conditions, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
//		读取 users 集合
		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
//			查找 name 属性为 username 的文档
			collection.findOne(conditions,function(err, u) {
				mongodb.close();
				if (u) {
					//console.log(doc);
//					封装文档为 User 对象
					var user = new User(u);
					callback(err, user);
				} else {
					callback(err, null);
				}
			});
		});
	});
};
User.get = function(params, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
//		读取 users 集合
		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			//console.log(params.dbPager);

//			查找 name 属性为 username 的文档
			collection.find(params.conditions)
				.skip((params.dbPager.page-1)*params.dbPager.pagesize)
				.limit(params.dbPager.pagesize)
				.toArray(function(err, users) {
					mongodb.close();
					if (users) {
						//console.log(users);
//					封装文档为 User 对象
						callback(err, users);
					} else {
						callback(err, null);
					}
				});
		});
	});
};
User.getRows=function(conditions, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
//		读取 users 集合
		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			console.log(conditions);
//			查找 name 属性为 username 的文档
			collection.count(conditions,function(err, count) {
				mongodb.close();
				if (count) {
					callback(err, count);
				} else {
					callback(err, null);
				}
			});
		});
	});
};
User.del=function(conditions, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
//		读取 users 集合
		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			//console.log(conditions);
//			查找 name 属性为 username 的文档
			collection.remove(conditions,function(err, r) {
				mongodb.close();
				if (r) {
					callback(err, r);
				} else {
					callback(err, null);
				}
			});
		});
	});
};
User.update=function(user, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
//		读取 users 集合
		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			//console.log(conditions);
//			查找 name 属性为 username 的文档
			collection.update({"userID":user.userID},{$set:user},function(err, r) {
				mongodb.close();
				if (r) {
					callback(err, r);
				} else {
					callback(err, null);
				}
			});
		});
	});
};