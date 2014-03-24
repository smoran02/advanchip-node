var mongoose = require('mongoose');
var account = mongoose.model('Account');
var gateway = mongoose.model('Gateway');


exports.register = function(req, res) {
	account.count({username: req.body.username}, function(err, c){
		if (c == 0) {
			var acc = new account(req.body);
			acc.save(function(err, docs) {
				console.log(docs);
			});
			res.end("success");
		}
		else {
			res.end("failure");
		}
	});
}

exports.login = function(req, res) {
	var acct = req.params.username;
	var pword = req.params.password;
	account.count({ username: acct, password: pword }, function(err, c) {
		if (c == 1) {
			res.end("User found");
		}
		else {
			res.end("User not found");
		}
	});
}

exports.users = function(req, res) {
	var userList = [];
	account.find({}, function(err, users){
		users.forEach(function(user){
			userList.push(user.username);
		});
		res.send(users);
	});
}

exports.eraseUsers = function(req, res){
	account.remove({}, function(err){
		console.log('user data cleared');
		res.end('user data cleared');
	});
}

