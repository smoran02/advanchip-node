
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var gcm = require('node-gcm');
var path = require('path');

var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/test';



mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});
require('./models/account')(mongoose);
require('./models/gateway')(mongoose);
var routes = require('./routes');
var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/users', routes.users);
app.get('/login/:username/:password', routes.login);
app.post('/register', routes.register);
app.get('/users/erase', routes.eraseUsers);

app.get('/gateways', routes.gateways);
app.get('/gateways/:user', routes.gatewaysByUser);
app.get('/gateway/:gateway_id', routes.getGateway);
app.get('/gateway/alloff/:gateway_id', routes.allOff);
app.post('/gateway/add', routes.addGateway);
app.post('/gateway/update', routes.updateGateway);
app.get('/gateways/erase', routes.eraseGateways);
app.get('/floor/:gateway_id/:floor', routes.addFloor);
app.get('/room/:gateway_id/:floor/:room', routes.addRoom);
app.get('/switch/:gateway_id/:floor/:room/:switch_id/:name', routes.addSwitch);

app.get('/toggle/:gateway_id/:switch_id', routes.toggle);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var registration_ids = [];
registration_ids.push('APA91bEBvQ6b3giluIRN91Ktm4eo7gaoZugh8pnAff1XSnlmMY6mo68ry5DT6C2wgSLpbrpEnCSx9ShjjTVLFCNfQT9b5bnth-tLC6Is-zi7qCoSgcC1JpGi_dHzEIk8ptXr38tFUV2GkR2J9AOUb2LZkCbtjdqDGccEn8MKqUmrv2wf5_11c6BfsStkrS8TfVgbuBm8NgcKj6wudcEZOwcMBpFPRiayG95sWU');

// Added by Troy ================================================
var mqtt = require('mqtt');
var client = mqtt.createClient(2000, '162.249.6.114', {
	username : 'user',
	password : 'advanchip'
});
var csg = require('./routes/csg');
var csgReq = require('./routes/csg_req');
var csgRes = require('./routes/csg_res');

client.subscribe('server');
client.on('message', function (topic, message) {
	csgRes.resHandler(message);
});

// For Testing... =================================================
app.get('/logcheck', csg.logcheck);
app.get('/logdel', csg.logdel);
app.get('/on/:gate/:swt', function(req,res){
	csgReq.turnOnOneSwitch(req.params.gate, req.params.swt, client);
	res.end('DONE');
});
app.get('/off/:gate/:swt', function(req,res){
	csgReq.turnOffOneSwitch(req.params.gate, req.params.swt, client);
	res.end('DONE');
});
app.get('/onall/:gate', function(req,res){
	csgReq.turnOnAllSwitch(req.params.gate, client);
	res.end('DONE');
});
app.get('/offall/:gate', function(req,res){
	csgReq.turnOffAllSwitch(req.params.gate, client);
	res.end('DONE');
});
app.get('/status/:gate', function(req,res){
	csgReq.reqStatus(req.params.gate, client);
	res.end('DONE');
});

/* To Spencer 
	First of all, request 'CloudMQTT Add-on' from Heroku.

	If you want to send a signal to a gateway, use one of these five in 'csg_req.js' in routes.
		csgReq.turnOnOneSwitch(gateway, switch, client);  // Turn On One Switch
		csgReq.turnOffOneSwitch(gateway, switch, client);  // Turn Off One Switch
		csgReq.turnOnAllSwitch(gateway, client);  // Turn On All Switches
		csgReq.turnOffAllSwitch(gateway, client);  // Turn Off All Switches
		csgReq.reqStatus(gateway, client);  // Request Status of All Switches
		
		P.S. The value client came from this part in 'app.js'
			var client = mqtt.createClient(2000, '162.249.6.114', {
				username : 'user',
				password : 'advanchip'
			});
			
	If you take a look at 'csg_res.js' in routes, there are several responses.
	Probably you have to update the DB depending on the response.
	I provided you with APIs so that it makes everything easier for you.
	
	If you have questions, let me know.(I usually prefer Gmail, not Facebook)
*/


