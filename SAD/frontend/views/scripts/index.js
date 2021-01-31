var zmq = require("zeromq");
var req =  zmq.socket('req');


function login(user) {
    alert("Hola " + user);
    var res = "";
    req.connect("tcp://127.0.0.1:9090");

    req.send("HI");

    alert("Mensaje enviado al worker");

    req.on("message", (msg) => {
        res = msg.toString()
        req.close();
    });
    
    return res;
}
