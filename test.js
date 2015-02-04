"use strict";

var should = require('should');
var bitflags = require('./bitflags');

describe('Bitflag tests',function() {

	var flags;

	it('should create the object',function(){

		flags = bitflags(2000000);

	});

	it('should turn on exactly one bit',function(){

		flags.on(505);

		flags.get(505).should.be.equal(true);

	});

	it('should turn off exactly one bit',function(){
		
		flags.off(505);

		flags.get(505).should.be.equal(false);

	});

	it('should set exactly one bit to 1',function(){
		
		flags.set(505,1);

		flags.get(505).should.be.equal(true);

	});

	it('should set exactly one bit to 0',function(){
		
		flags.set(505,0);

		flags.get(505).should.be.equal(false);

	});

	it('should flip exactly one bit from off to on',function(){
		
		flags.flip(505);

		flags.get(505).should.be.equal(true);

	});

	it('should flip exactly one bit from on to off',function(){
		
		flags.flip(505);

		flags.get(505).should.be.equal(false);

	});


	it('should have size divisible by 8',function(){
		var exact = bitflags(16);
		var over = bitflags(17);
		(exact.size()%8).should.be.equal(0);
		(over.size()%8).should.be.equal(0);

	});

	it('should turn on all the flags',function(){

		var n = 1024;
		var f = bitflags(n);
		f.fill();
		for(var i=0;i<n;i++) {
			f.get(i).should.be.equal(true);
		}

	});

	it('should turn off all the flags',function(){

		var n = 1024;
		var f = bitflags(n);
		f.fill();
		f.clear();
		for(var i=0;i<n;i++) {
			f.get(i).should.be.equal(false);
		}

	});

});