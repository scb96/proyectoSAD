var zmq = require('zeromq');
var emitter = zmq.socket('router');
var queue = zmq.socket('dealer');

emitter.bind("tcp://127.0.0.1:9000");
queue.bind("tcp://127.0.0.1:9001");

emitter.on("message", (msg) => {
    console.log("Mensaje recibido");
    console.log(msg);
    queue.send(msg);
    console.log("Enviado a la cola");
});

