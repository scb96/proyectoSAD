var zmq = require('zeromq');
var pub = zmq.socket('pub');
var rep = zmq.socket('rep');
var req = zmq.socket('req');
var pull = zmq.socket('pull');
var workerPull = zmq.socket('pull');
var clientPush = zmq.socket('push')
var port = process.argv[2];
var portSub = process.argv[3];
var portRep = process.argv[4];
var portWorker = process.argv[5];

let publications = [], requests = [], workers = [];

pull.bind("tcp://127.0.0.1:" + port);
console.log("Cola lista para recibir mensajes por el puerto " + port);

rep.bind("tcp://frontend:" + portRep);
console.log("Cola conectada con el frontend en el puerto " + portRep);

pub.bind("tcp://frontend:" + portSub);
console.log("Publicador conectado en el puerto " + portSub);

req.connect("tcp://worker:9003");
console.log("Cola conectada al worker en el puerto 9003");

clientPush.connect("tcp://frontend:9030");

workerPull.bind("tcp://worker:" + portWorker);

workerPull.on('message', (msg) => {
    switch(JSON.parse(msg).id) {
        case "HIWORKER":
            workers.push("W1");
            console.log("Nuevo worker registrado");
            break;
        case "HICLIENT": 
            workers.push("W1");
            console.log("Nuevo cliente registrado");
            clientPush.send(msg);
            console.log("Respuesta al cliente enviada");
            break;
        case "BYECLIENT": 
            workers.push("W1");
            console.log("Nuevo cliente registrado");
            clientPush.send(msg);
            console.log("Respuesta al cliente enviada");
            break;
    }
});

req.on('message', (msg) => {
        switch(JSON.parse(msg).id) {
            case "NC": 
                console.log("Nuevo cliente registrado");
                rep.send(msg);
                console.log("Respuesta al cliente enviada");
                break;
    }
});

rep.on('message', (msg) => {
    console.log("Mensaje recibido del cliente con ID = " + JSON.parse(msg).id);
    /*if(workers.length == 0) {
        requests.push(msg);
        console.log("No hay workers disponibles. Mensaje encolado");
    } else if(requests.length > 0) {
        requests.push(msg);
        req.send(requests[0]);
        workers.shift();
        requests.shift();
    } else {*/
        req.send(msg);
        console.log("Mensaje enviado al worker");
        //workers.shift();
    //}
});

pull.on('message', msg => {
    console.log("Mensaje recibido: \n");
    console.log(JSON.parse(msg));
    console.log("\n --------------------------");
    publications.push(msg);
});

function publish() {
    if (publications.length > 0) {
        var res = JSON.parse(publications[0]);
        console.log(res);
        var topic = res.topic;
        var msg = res.msg
        pub.send([topic, msg]);
        console.log("Mensaje publicado con éxito!");
        publications.shift();
    }
}

setInterval(publish, 3000);



