var zmq = require('zeromq');
var subSocket = zmq.socket('sub');

subSocket.connect("tcp://127.0.0.1:9050");
subSocket.subscribe("argentina");
subSocket.subscribe("venezuela");
console.log("Conectado al puerto 9050");

var cont = 1;

subSocket.on("message", function(msg) {
   console.log(msg); 
});
