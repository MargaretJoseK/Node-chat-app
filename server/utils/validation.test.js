var expect = require('expect');
var {isString} = require('./validation');

//it should reject non string and spaces
//it should acept only strings

describe('isString',()=>{

    it('should accept only strings with no spaces',()=>{

        var res = isString("mj ");
        expect(res).toBe(true);
    });

    it('should reject non string values',()=>{

        var res= isString(22);
        expect(res).toBe(false);

    });

    it('should reject spaces',()=>{

        var res = isString('   ');
        expect(res).toBe(false);
    });
});