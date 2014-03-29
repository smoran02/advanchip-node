var mongoose = require('mongoose');
var account = mongoose.model('Account');
var gateway = mongoose.model('Gateway');

var csg = require('./csg');
var myLog = csg.myLog;

exports.resHandler = function(message){
	myLog.push('====== RECEIVED MESSAGE ======');
	myLog.push('MESSAGE : ' + message);
	
	var message = JSON.parse(message);
	
	if( message.p == "REG" ){
		myLog.push('PURPOSE : REGISTRATION RESPONSE');
		myLog.push('GATEWAY : ' + message.ga);
		myLog.push('RESULT : The switch is now registered');
		
		// TODO
		var gatewayID = message.ga;
		// Your job starts here
	}
	else if( message.p == 'AS' ){
		myLog.push('PURPOSE : ACTIVATION RESPONSE');
		myLog.push('GATEWAY : ' + message.ga);
		myLog.push('SWITCH : ' + message.sw);
		myLog.push('RESULT : The switch is now activated');
		
		// TODO
		var gatewayID = message.ga;
		var switchNum = parseInt(message.sw);
		// Your job starts here
	}
	else if( message.p == 'DS' ){
		myLog.push('PURPOSE : DEACTIVATION RESPONSE');
		myLog.push('GATEWAY : ' + message.ga);
		myLog.push('SWITCH : ' + message.sw);
		myLog.push('RESULT : The switch is now deactivated');
		
		// TODO
		var gatewayID = message.ga;
		var switchNum = parseInt(message.sw);
		// Your job starts here
	}
	else if( message.p == 'ONA' ){
		myLog.push('PURPOSE : TURN ON ONE SWITCH RESPONSE');
		myLog.push('GATEWAY : ' + message.ga);
		myLog.push('SWITCH : ' + message.sw);
		myLog.push('RESULT : The switch is already on');
		
		// TODO
		var gatewayID = message.ga;
		var switchNum = parseInt(message.sw);
		// Your job starts here
	}
	else if( message.p == 'ONS' ){
		myLog.push('PURPOSE : TURN ON ONE SWITCH RESPONSE');
		myLog.push('GATEWAY : ' + message.ga);
		myLog.push('SWITCH : ' + message.sw);
		myLog.push('RESULT : The switch is now on');
		
		// TODO
		var gatewayID = message.ga;
		var switchNum = parseInt(message.sw);
		// Your job starts here
	}
	else if( message.p == 'OND' ){
		myLog.push('PURPOSE : TURN ON ONE SWITCH RESPONSE');
		myLog.push('GATEWAY : ' + message.ga);
		myLog.push('SWITCH : ' + message.sw);
		myLog.push('RESULT : The switch is deactivated');
		
		// TODO
		var gatewayID = message.ga;
		var switchNum = parseInt(message.sw);
		// Your job starts here
	}
	else if( message.p == 'OFA' ){
		myLog.push('PURPOSE : TURN OFF ONE SWITCH RESPONSE');
		myLog.push('GATEWAY : ' + message.ga);
		myLog.push('GATEWAY : ' + message.sw);
		myLog.push('RESULT : The switch is already off');
		
		// TODO
		var gatewayID = message.ga;
		var switchNum = parseInt(message.sw);
		// Your job starts here
	}
	else if( message.p == 'OFS' ){
		myLog.push('PURPOSE : TURN OFF ONE SWITCH RESPONSE');
		myLog.push('GATEWAY : ' + message.ga);
		myLog.push('GATEWAY : ' + message.sw);
		myLog.push('RESULT : The switch is now off');
		
		// TODO
		var gatewayID = message.ga;
		var switchNum = parseInt(message.sw);
		// Your job starts here
	}
	else if( message.p == 'OFD' ){
		myLog.push('PURPOSE : TURN OFF ONE SWITCH RESPONSE');
		myLog.push('GATEWAY : ' + message.ga);
		myLog.push('GATEWAY : ' + message.sw);
		myLog.push('RESULT : The switch is deactivated');
		
		// TODO
		var gatewayID = message.ga;
		var switchNum = parseInt(message.sw);
		// Your job starts here
	}
	else if( message.p == 'ANR' ){
		myLog.push('PURPOSE : TURN ON ALL SWITCHES RESPONSE');
		myLog.push('GATEWAY : ' + message.ga);
		myLog.push('RESULT : ' + message.re);
		
		// TODO
		var gatewayID = message.ga;
		var switchCount = message.re.length;
		var status = [];
		for(var i=0 ; i<switchCount ; i++){
			status.push(switchCount.charAt(i));
		}
		// status[] = 'n' : on, 'f' : off, 'd' : deactivated
		// Your job starts here
	}
	else if( message.p == 'AFR' ){
		myLog.push('PURPOSE : TURN OFF ALL SWITCHES RESPONSE');
		myLog.push('GATEWAY : ' + message.ga);
		myLog.push('RESULT : ' + message.re);
		
		// TODO
		var gatewayID = message.ga;
		var switchCount = message.re.length;
		var status = [];
		for(var i=0 ; i<switchCount ; i++){
			status.push(switchCount.charAt(i));
		}
		// status[] = 'n' : on, 'f' : off, 'd' : deactivated
		// Your job starts here
	}
	else if( message.p == 'ASR' ){
		myLog.push('PURPOSE : STATUS RESPONSE');
		myLog.push('GATEWAY : ' + message.ga);
		myLog.push('RESULT : ' + message.re);
		
		// TODO
		var gatewayID = message.ga;
		var switchCount = message.re.length;
		var status = [];
		for(var i=0 ; i<switchCount ; i++){
			status.push(switchCount.charAt(i));
		}
		// status[] = 'n' : on, 'f' : off, 'd' : deactivated
		// Your job starts here
	}
	myLog.push('\n');
};
