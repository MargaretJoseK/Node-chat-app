var expect= require('expect');

var {generateMessage,generateLocationMessage}= require('./message');

describe('generateMessage',()=>{
    it('should generate correct object',()=>{

        var from = "margaret";
        var text = "some message";
        var message = generateMessage(from,text);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    });

describe('generateLocationMessage',()=>{

    it('should generate location',()=>{

        var from ="kp";
        var latitude= 20;
        var longitude = 23;
        var url='https://www.google.com/maps?q=20,23';
        var message=generateLocationMessage(from,latitude,longitude);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,url});

        });

    });

});