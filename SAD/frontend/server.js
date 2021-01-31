var zmq = require("zeromq");
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");
var path = require('path');
    
var sub = zmq.socket('sub');
var req =  zmq.socket('req');
var pull = zmq.socket('pull');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var user = process.argv[2];
var suscritos = [];

io.on('login', function(socket) {
    console.log("Usuario conectado");
});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

//app.set("view engine", "jade");

//app.use(express.static('scripts'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
    //res.status(200).send("Proyecto de SAD");
});


app.get('/subscriptions', (req, res) => {
    res.send(suscritos);
    console.log("Suscripciones actuales: \n" + suscritos);
});

app.post('/subscribe/:topic', (req, res) => {
   suscritos.push(req.params.topic);
   sub.subscribe(req.params.topic);
   res.send("Nueva suscripción a " + req.params.topic);
   console.log("Nueva suscripción al tema: " + req.params.topic);
   console.log("Suscripciones actuales: \n" + suscritos);
});
    
app.post('/unsubscribe/:topic', (req, res) => {
    var i = suscritos.indexOf( req.params.topic );
    if (i !== -1) {
        suscritos.splice(i, 1);
        sub.unsubscribe(req.params.topic);
        res.send("Se ha dado de baja la suscripción del tema: " + req.params.topic);
        console.log("Se ha dado de baja la suscripción del tema: " + req.params.topic);
        console.log("Suscripciones actuales: \n" + suscritos);
    } else { 
        console.log("No estabas suscrito al tema: " + req.params.topic);
        res.send("No estabas suscrito al tema: " + req.params.topic);
    }

});
    
app.post('/login/:user', (req, res) => {
    login(req.params.user);
});

app.post('/signout/:user', (req, res) => {
    signout(req.params.user);
});
    
sub.connect("tcp://127.0.0.1:9005");
console.log("Conectado a las colas en el puerto 9005");
sub.connect("tcp://127.0.0.1:9006");
console.log("Conectado a las colas en el puerto 9006");
sub.connect("tcp://127.0.0.1:9007");
console.log("Conectado a las colas en el puerto 9007");

req.connect("tcp://127.0.0.1:9010");
req.connect("tcp://127.0.0.1:9011");
req.connect("tcp://127.0.0.1:9012");

pull.bind("tcp://127.0.0.1:9030");

pull.on('message', (msg) => {
    console.log(JSON.parse(msg).msg);
});

function login(user) {
    var res = {}
    res.id = "HIUSER";
    res.user = user;
    req.send(JSON.stringify(res));
    console.log("Inicio de sesión: " + user);
}

function signout(user) {
    var res = {}
    res.id = "BYEUSER";
    res.user = user;
    req.send(JSON.stringify(res));
    suscritos.forEach(e => unsuscribe(e));
    console.log("Cierre de sesión: " + user);
}

sub.on('message', function(topic, msg) {
    console.log("Mensaje recibido!");
    console.log("Tema: " + topic + " - Mensaje: " + msg);
});

app.listen(9050, function() {
   console.log("Servidor escuchando en http://127.0.0.1:9050"); 
});

