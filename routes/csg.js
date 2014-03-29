var myName = 'server';
var myLog = [];

exports.myLog = myLog;

exports.logcheck = function(req, res){
	var display = '***********************\nSERVER LOG\n***********************\n';
	for(var i=0 ; i<myLog.length ; i++){
		display += myLog[i] + '\n';
	}
	res.end(display);
}

exports.logdel = function(req, res){
	myLog.length = 0;
	res.end('RESULT : Server Msg Log Cleared!');
}