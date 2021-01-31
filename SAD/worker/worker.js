var zmq = require('zeromq');

var push = zmq.socket('push');
var rep = zmq.socket('rep');
var user = process.argv[2];

var cli = [];

push.connect("tcp://queue1:9040");
// push.connect("tcp://127.0.0.1:9041");
// push.connect("tcp://127.0.0.1:9042");

rep.bind("tcp://queue1:9003");

rep.on("message", (m) => {
    switch(JSON.parse(m).id) {
        case "HIUSER":
            registerUser(JSON.parse(m).user);
            break;
        case "BYEUSER":
            removeUser(JSON.parse(m).user);
            break;
        
    }
});

function registerUser(user) {
    console.log("Nuevo cliente");
    cli.push(user);
    
    var resM = {};
    resM.id = "HICLIENT";
    resM.user = user;
    resM.msg = "Bienvenido " + user + "!";
    console.log(JSON.stringify(resM));
    push.send(JSON.stringify(resM));
    console.log("Mensaje enviado a la cola");
    
}

function removeUser(user) {
    var i = cli.indexOf(user);
    if (i !== -1) {
        cli.splice(i, 1);
        var resM = {};
        resM.id = "BYECLIENT";
        resM.user = user;
        resM.msg = "Hasta pronto " + user + "!";
        console.log(JSON.stringify(resM));
        push.send(JSON.stringify(resM));
        console.log("Mensaje enviado a la cola");
    
    }
}

function login(user) {
    var resM = {};
    resM.id = "HIWORKER";
    push.send(JSON.stringify(resM));
    console.log("Worker " + user + " registrado");
    
}
    
console.log("Escuchando en el puerto 9003");
login(user);
