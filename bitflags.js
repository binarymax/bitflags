var bitflags = (function(){

	//------------------------------------------
	//Memory efficient array of bool flags
	var Bitflags = function(size){
		this._size  = size;
		this._cols  = 8;
		this._shift = 3;
		this._rows  = (size>>this._shift)+1;
		this._buf   = new ArrayBuffer(this._rows);
		this._bin   = new Uint8Array(this._buf);
	};

	//Gets the bool at offset
	Bitflags.prototype.get = function(offset){
		var row = offset>>this._shift;
		var col = offset%this._cols;
		var bit = 1<<col;
		return (this._bin[row]&bit)>0;
	};

	//Sets a bit at offset to bool
	Bitflags.prototype.set = function(offset,bool){
		var row = offset>>this._shift;
		var col = offset%this._cols;
		var bit = 1<<col;
		if (bool) {
			this._bin[row] |= bit;
		} else {
			bit = 255 ^ bit;
			this._bin[row] &= bit;
		}
	};

	//Sets the bit at offset to ON
	Bitflags.prototype.on = function(offset) {
		this.set(offset,1);
	};

	//Sets the bit at offset to OFF
	Bitflags.prototype.off = function(offset) {
		this.set(offset,0);
	};

	//Flip and returns the value of a single bit at offset
	Bitflags.prototype.flip = function(offset){
		var row = Math.floor(offset/this._cols);
		var col = offset%this._cols;
		var bit = 1<<col;
		return this._bin[row] ^= bit;
	};

	//Reset to all 1's
	Bitflags.prototype.fill = function() {
		for(var i=0;i<this._rows;i++) {
			this._bin[i] = 255;
		}
	};

	//Reset to all 0's
	Bitflags.prototype.clear = function() {
		for(var i=0;i<this._rows;i++) {
			this._bin[i] = 0;
		}
	};

	//Return exact size in bits
	Bitflags.prototype.size = function() {
		return this._rows*this._cols;
	};

	return function(size) {
		return new Bitflags(size);
	};

})();

if(typeof module !== "undefined" && module.exports) {
  //node||io.js
  module.exports = bitflags;
} else if (typeof window!=="undefined") {
  //browser
  window.bitflags = bitflags;
}