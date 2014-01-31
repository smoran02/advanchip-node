
/**
 * Module dependencies.
 */

var express = require('express');
var user = require('./routes/user');
var http = require('http');
var mongoose = require('mongoose');
var gcm = require('node-gcm');
var path = require('path');

mongoose.connect('mongodb://localhost/test');
require('./models/account')(mongoose);
require('./models/gateway')(mongoose);
var routes = require('./routes');
var app = express();

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

var current_state = "on";

app.get('/', routes.index);
app.get('/login/:username/:password', routes.login);
app.get('/register/:username/:password', routes.register);
app.get('/users', user.list);
app.get('/:user/:light/toggle', routes.toggle(current_state, gcm));

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var registration_ids = [];
registration_ids.push('APA91bEBvQ6b3giluIRN91Ktm4eo7gaoZugh8pnAff1XSnlmMY6mo68ry5DT6C2wgSLpbrpEnCSx9ShjjTVLFCNfQT9b5bnth-tLC6Is-zi7qCoSgcC1JpGi_dHzEIk8ptXr38tFUV2GkR2J9AOUb2LZkCbtjdqDGccEn8MKqUmrv2wf5_11c6BfsStkrS8TfVgbuBm8NgcKj6wudcEZOwcMBpFPRiayG95sWU');




