var zmq = require('zeromq');
var pub = zmq.socket('pub');
var rep = zmq.socket('rep');

pub.bind("tcp://127.0.0.1:9000");
console.log("Publicador conectado en el puerto 9000");

rep.bind("tcp://127.0.0.1:9001");

rep.on('message', (msg) => {
    console.log("Mensaje recibido: \n");
    console.log(JSON.parse(msg));
    console.log("\n --------------------------");
    rep.send("Mensaje recibido por el publicador");
    pub.send(msg);
});


