//Client Side

var socket= io();

function scrollToBottom()
{
    //selectors
    var messages=jQuery('#messages');
    var newMessage=messages.children('li:last-child');
    var clientHeight = messages.prop('clientheight'); //prop() is a cross browswer way to fetch the property. its an alternative of JQuery.
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight= newMessage.innerHeight();
    var lastmessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastmessageHeight >=scrollHeight)
    {
        messages.scrollTop(scrollHeight);

    }
}
socket.on('connect',function(){
   
    var params= jQuery.deparam(window.location.search);
    
    socket.emit('join',params,function(err){
        if(err)
        {
            alert(err);
            window.location.href ='/';
        }
        else
        {
            console.log("No error");
        }

    });
});

socket.on('updateUserList',function(users){

    var ol = jQuery('<ol></ol>');
    users.forEach(function(user){

        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});

socket.on('disconnect',function(){
    console.log("Disconnect from server");
});


socket.on('newMessage',function(message){

     var formattedTime=moment(message.createdAt).format('hh:mm a');

    var template= jQuery('#message-template').html();
    var html= Mustache.render(template,{

        text : message.text,
        from : message.from,
        createdAt : formattedTime

    });
    jQuery('#messages').append(html);
    scrollToBottom();

    // var formattedTime=moment(message.createdAt).format('hh:mm a');
    // console.log('newMessage',message);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from}: ${formattedTime} --${message.text} `);

    // jQuery('#messages').append(li);

});


socket.on('newLocationMessage',function(message){
    var formattedTime=moment(message.createdAt).format('hh:mm a');

    var template=jQuery('#location-message-teplate').html();
    var html=Mustache.render(template,{

        from : message.from,
        url : message.url,
        createdAt : formattedTime

    });
    jQuery('#messages').append(html);
    scrollToBottom();
    // var li = jQuery('<li></li>');
    // var a =jQuery('<a target="_blank">My current location</a>');

    // li.text(`${message.from}: ${formattedTime} `);
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery('#messages').append(li);


});

jQuery('#message-form').on('submit',function(e){

    e.preventDefault();
    var msgTextBox= jQuery('[name=message]');
    socket.emit('createMessage',{

        
        text : msgTextBox.val()
    },function () {

            msgTextBox.val('')
        
    });
});

var locationButton=jQuery('#send-location');
locationButton.on('click',function(){

    if(!navigator.geolocation)
    {
        return alert("Geolocation not supported by your browser.");

    }

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{

            latitude : position.coords.latitude,
            longitude : position.coords.longitude

        });

        console.log(position);
    },function(){

        alert("Unable to fetch location.");

    });
});