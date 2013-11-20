
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var gcm = require('node-gcm');
var path = require('path');
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

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/:user/:light/toggle', routes.toggle);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


var registration_ids = [];
registration_ids.push('APA91bGTZAtSLOhNTO0yS7qACd_BO4oMo8nStuhqE7FG72QVrI-tLC6Is-zi7qCoSgcC1JpGi_dHzEIk8ptXr38tFUV2GkR2J9AOUb2LZkCbtjdqDGccEn8MKqUmrv2wf5_11c6BfsStkrS8TfVgbuBm8NgcKj6wudcEZOwcMBpFPRiayG95sWU');

var message = new gcm.Message({
		collapseKey: "demo",
    delayWhileIdle: true,
    data: {
        key1: 'message1',
        key2: 'message2'
    }
});

var sender = new gcm.Sender('AIzaSyBS1lt8tplnRFl8Z3YZtsQivXzdPNDYtW8');
sender.send(message, registration_ids, 4, function (err, result) {
    console.log(result);
});



