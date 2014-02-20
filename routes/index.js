var mongoose = require('mongoose');
var account = mongoose.model('Account');
var gateway = mongoose.model('Gateway');

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

exports.users = function(req, res) {
	var userList = [];
	account.find({}, function(err, users){
		users.forEach(function(user){
			userList.push(user.username);
		});
		// res.render('users', { title: 'Users', userList: userList } );
		res.send(userList);
	});
}

exports.eraseUsers = function(req, res){
	account.remove({}, function(err){
		console.log('user data cleared');
		res.end('user data cleared');
	});
}

exports.eraseGateways = function(req, res){
	gateway.remove({}, function(err){
		console.log('gateway data cleared');
		res.end('gateway data cleared');
	});
}

exports.gateways = function(req, res) {
	var gatewayList = [];
	gateway.find({}, function(err, gateways){
		gateways.forEach(function(gateway){
			gatewayList.push(gateway.gatewayID);
		});
		res.send(gateways);
	});
}

exports.addGateway = function(req, res){
	var gate = new gateway({ gatewayID: req.params.id });
	gate.save(function(err, docs){
		if (err){
			console.log(err);
			res.send(err.err);
		}
		else {
			console.log(docs);
			res.end('done');	
		}
	});
}

exports.addLight = function(req, res){
	var dupe = false;
	gateway.findOne({ gatewayID: req.params.gateway_id }, function(err, gate){
		if (gate === null){
			res.send("Couldn't find gateway with id " + req.params.gateway_id);
		}
		else {
			for (var i = 0; i < gate.lights.length; i++) {
				if (gate.lights[i].light_id === req.params.light_id){
					dupe = true;
					break;
				}
			}
			if (dupe){
				res.end('light ' + req.params.light_id + " already exists on gateway " + req.params.gateway_id);
			}
			else {
				var newLight = {};
				newLight.light_id = req.params.light_id;
				newLight.state = false;
				gate.lights.push(newLight);
				gate.save(function(err, docs){
					console.log(err);
					res.send("light " + req.params.light_id + " added to gateway " + req.params.gateway_id);
					res.send(gate);
				});
			}
		}
	});
}













