const express = require('express');
const app = express()
const socket = require('socket.io');

const server = app.listen(4000, function(){
    console.log('listening on port 4000')
})

app.use(express.static('public'));

let io = socket(server);
let users = 0;

io.on('connection', function(socket){
    if(users < 2){
        io.sockets.emit('broadcast',{ description: `${users += 1} user connected`})
    }else if(users >= 2){
        io.sockets.emit('broadcast',{ description: `${users += 1} users connected`})
    }


    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    })


    socket.on('disconnect', function(){
        io.sockets.emit('broadcast',{ description: `${users -= 1} users connected`})
    })
})

