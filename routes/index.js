var mongoose = require('mongoose');
var account = mongoose.model('Account');

exports.index = function(req, res){
  res.render('index', { title: 'Advanchip' });
};

exports.toggle = function(current_state, gcm){
	return function(req, res){
		var user_id = req.params.user;
		var light_id = req.params.light;
		current_state = !current_state;
		var message = new gcm.Message();
		message.addData('message', current_state);
		//message.addData('light', light_id)
		var registration_ids = [];
		registration_ids.push(user_id);

		var sender = new gcm.Sender('AIzaSyBS1lt8tplnRFl8Z3YZtsQivXzdPNDYtW8');
		sender.send(message, registration_ids, 4, function (err, result) {
		    console.log(result);
		    console.log(message);
		});

		res.render('index', { title: 'Toggle a light', user: user_id, light: light_id, state: current_state } );
	}
}

exports.register = function(req, res) {
	account.count({username: req.params.username}, function(err, c){
		if (c == 0) {
			var acc = new account({ username: req.params.username, password: req.params.password });
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

exports.gateway = function(req, res) {
	var gateway_id = req.params.gateway_id;
	var gateway_host = req.params.gateway_host;
	
}

exports.users = function(req, res) {
	var userList = [];
	account.find({}, function(err, users){
		users.forEach(function(user){
			userList.push(user.username);
		});
		// res.render('users', { title: 'Users', userList: userList } );
		res.send(users);
	});
}