

exports.index = function(req, res){
  res.render('index', { title: 'Advanchip' });
};

exports.toggle = function(current_state, gcm){
	return function(req, res){
		var user_id = req.params.user;
		var light_id = req.params.light;
		if (current_state === "off"){
			current_state = "on";
		}
		else {
			current_state = "off";
		}
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