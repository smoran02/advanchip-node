

exports.index = function(req, res){
  res.render('index', { title: 'Advanchip' });
};

exports.toggle = function(req, res){
	var user_id = req.params.user;
	var light_id = req.params.light;
	var light_state = "off";
	res.render('index', { title: 'Toggle a light', user: user_id, light: light_id, state: light_state } );
}