var socket=  io();
socket.on('connected',function(){
    console.log("Connected to server.");

    socket.emit('createMessage',{

        from : 'Margaret',
        text : 'Hello.'
    });
});

socket.on('disconnect',function(){
    console.log("Disconnect from server");
});


socket.on('newMessage',function(message){
    console.log('newMessage',message)

});
