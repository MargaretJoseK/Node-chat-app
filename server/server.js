const express = require('express');
const socketIO = require('socket.io');
const http =require('http');
const path = require('path');


const publicPath= path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app= express();
var server = http.createServer(app);
var io=socketIO(server);

io.on('connection',(socket)=>{
    console.log("New user connected.");

    socket.on('disconnect',()=>{
        console.log("User was disconnected.")
    });
});//for event listener to start.

app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Server is up on port:  ${port}`);
});