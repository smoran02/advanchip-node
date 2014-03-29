var csg = require('./csg');
var myLog = csg.myLog;
var respond = "";

exports.turnOnOneSwitch = function(gate, swt, client){
	respond = {	p : 'ON', sw : swt };
	respond = JSON.stringify(respond);
	client.publish(gate, respond);
				
	myLog.push('====== TURN ON ONE SWITCH REQUEST ======');
	myLog.push('RESULT : Turn On One Switch Request Sent = Gateway \''+gate+'\', Switch \''+swt+'\'\n');
}

exports.turnOffOneSwitch = function(gate, swt, client){
	respond = {	p : 'OF', sw : swt };
	respond = JSON.stringify(respond);
	client.publish(gate, respond);
			
	myLog.push('====== TURN OFF ONE SWITCH REQUEST ======');
	myLog.push('RESULT : Turn Off One Switch Request Sent = Gateway \''+gate+'\', Switch \''+swt+'\'\n');
};

exports.turnOnAllSwitch = function(gate, client){
	respond = {	p : 'AN' };
	respond = JSON.stringify(respond);
	client.publish(gate, respond);
			
	myLog.push('====== TURN ON ALL SWITCHES REQUEST ======\n');
	myLog.push('RESULT : Turn On All Switches Request Sent = Gateway \''+gate+'\'\n');
};

exports.turnOffAllSwitch = function(gate, client){
	respond = {	p : 'AF' };
	respond = JSON.stringify(respond);
	client.publish(gate, respond);
			
	myLog.push('====== TURN OFF ALL SWITCHES REQUEST ======\n');
	myLog.push('RESULT : Turn Off All Switches Request Sent = Gateway \''+gate+'\'\n');
};

exports.reqStatus = function(gate, client){
	respond = {	p : 'AS' };
	respond = JSON.stringify(respond);
	client.publish(gate, respond);
			
	myLog.push('====== STATUS REQUEST ======\n');
	myLog.push('RESULT : Status Request Sent = Gateway \''+gate+'\'\n');
};