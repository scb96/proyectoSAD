var zmq = require('zeromq');
var pubSocket = zmq.socket('pub');

pubSocket.bind("tcp://127.0.0.1:9050");
console.log("Publicador conectado en el puerto 9050");

var paises = ['holanda','brasil','alemania','portugal','argentina','italia','rusia','venezuela']

var eventos = ['tarjeta amarilla','tarjeta roja','gol','corner','falta']

var cont = 1;

function sendMessage() {
//while (cont <= 20) {
 var randomPais = Math.round(Math.random() * (paises.length - 0) + 0);
 var randomEvento = Math.round(Math.random() * (eventos.length - 0) + 0);

 var msg = paises[randomPais] + " - " + eventos[randomEvento];
 
 pubSocket.send(msg);
 console.log(msg);
 cont += 1;

//}

}

setInterval(sendMessage, 1000);
