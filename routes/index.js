var mongoose = require('mongoose');
var account = mongoose.model('Account');
var gateway = mongoose.model('Gateway');

exports.index = function(req, res){
  res.render('index', { title: 'Advanchip' });
};

exports.toggle = function(current_state, gcm){
	return function(req, res){
		var user_id = req.params.user;
		var switch_id = req.params.switch_id;
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

		res.render('index', { title: 'Toggle a switch', user: user_id, swich: switch_id, state: current_state } );
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
		res.send(users);
	});
}

exports.eraseUsers = function(req, res){
	account.remove({}, function(err){
		console.log('user data cleared');
		res.end('user data cleared');
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

exports.gatewaysByUser = function(req, res){
	gateway.find({ 'users.name': req.params.user }, function(err, gates){
		if (err) console.log(err);
		res.send(gates);
	});
}

exports.eraseGateways = function(req, res){
	gateway.remove({}, function(err){
		console.log('gateway data cleared');
		res.end('gateway data cleared');
	});
}

exports.getGateway = function(req, res){
	gateway.findOne({ gatewayID: req.params.gateway_id }, function(err, gate){
		res.send(gate);
	});
}

exports.addGateway = function(req, res){
	console.log(req.body);
	var gate = new gateway(req.body);
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

exports.updateGateway = function(req, res){
	var query = { gatewayID: req.body.gatewayID };
	gateway.findOne(query, function(err, gate){
		console.log(gate);
	});
	gateway.findOneAndUpdate(query, req.body, function(err, gate){
		console.log(gate);
	});
}

exports.allOff = function(req, res){
	gateway.findOne({ gatewayID: req.params.gateway_id }, function(err, gate){
		gate.floors.forEach(function(floor){
			floor.rooms.forEach(function(room){
				room.switches.forEach(function(swich){
					swich.state = false;
				});
			});
		});
		gate.save(function(err, docs){
			console.log(docs);
		});
	});
}

exports.addSwitch = function(req, res){
	console.log(req.body);
}

/*exports.addSwitch = function(req, res){
	var dupe = false;
	gateway.findOne({ gatewayID: req.params.gateway_id }, function(err, gate){
		if (gate === null){
			res.send("Couldn't find gateway with id " + req.params.gateway_id);
		}
		else {
			for (var i = 0; i < gate.switches.length; i++){
				if (gate.switches[i].switch_id === req.params.switch_id){
					dupe = true;
					break;
				}
			}
			if (dupe){
				res.end('switch ' + req.params.switch_id + " already exists on gateway " + req.params.gateway_id);
			}
			else {
				var newSwitch = {};
				newSwitch.switch_id = req.params.switch_id;
				newSwitch.state = false;
				gate.switches.push(newSwitch);
				gate.save(function(err, docs){
					console.log(err);
					res.send("Switch " + req.params.switch_id + " added to gateway " + req.params.gateway_id);
					res.send(gate);
				});
			}
		}
	});
}*/













