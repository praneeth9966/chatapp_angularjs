var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var users=require('./server/controller/controller')

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));
var router = require('./server/router/route')
app.use('/', router);
server.listen(8080);
console.log("Listening to PORT 8080");
app.use(express.static('./public'));

// io.sockets.on('connection', function (socket) {
//     console.log('A client is connected!');
// });


// io.sockets.on('connection', function (socket) {
//     socket.emit('message', 'You are connected!');
// });

io.on('connection', (socket) => {
    console.log("New User Connected");
    //socket.email="abc@abc.com";

    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', 'All set')
    });
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', 'anonymous')
    });
});

io.on('connection', function(client) {
    client.on('disconnect', function() {
    console.log("disconnected")
    });
    
    client.on('toBackEnd', function(data) {
        users.addMessages(data.message, data.date, data.username)
               io.emit('message', data);
    })
});