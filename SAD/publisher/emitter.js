var zmq = require('zeromq');
var req = zmq.socket('req');
var push = zmq.socket('push');

var topic;
var msg;
var res = {};
var data = [];

push.connect("tcp://queue1:9996");
// push.connect("tcp://queue2:9997");
// push.connect("tcp://queue3:9998");


//req.connect("tcp://127.0.0.1:9000");
//console.log("Conectado al puerto 9000");

var q = ["Ingrese el tema de la publicación [coches, pisos, tecnologia]: ", "Ingrese el mensaje a publicar: "]
var r = [];

function escribe(i) {
    process.stdout.write(q[i]);
}

process.stdin.on('data', function(data) {
    r.push(data.toString().trim());   
    if(r.length < q.length) {
        escribe(r.length);
    } else {
        res.topic = r[0];
        res.msg = r[1];
        push.send(JSON.stringify(res));
        r = [];
        escribe(0);
    }
});

req.on('message', (msg) => {
    console.log(msg.toString().trim());
    //req.close();

});

escribe(0);
