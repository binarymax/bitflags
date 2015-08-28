# bitflags
Small library for working with an arbitrarily large array of booleans


## Install

### npm
```
npm install bitflags
```

## API

```
var bitflags = require('bitflags');
var flags = bitflags(1000000); //Creates a million boolean flags
```

### get
Gets the bool at offset

```
flags.get(n) //returns true or false
```

### set
Sets a bit at offset to bool

```
flags.set(n,0) //sets to false
```

```
flags.set(n,1) //sets to true
```

```
flags.set(n,'truthy') //sets to true
```


### on
Sets the bit at offset to true

```
flags.on(n)
```

### off
Sets the bit at offset to false

```
flags.off(n)
```

### flip
Flip and returns the value of a single bit at offset

```
flags.flip(n)
```

### fill
Reset to all 1's

```
flags.fill()
```

### clear
Reset to all 0's

```
flags.clear()
```

### size
Return exact size in bits
*note: may be larger than size specified in constructor, due to storage in octets*
```
flags.size()
```

## Example

Sets a flag for each prime in the first 2000000 integers, using Sieve of Eratosthenes, returns a function to test for primes:

```javascript
var getSieveOfEratosthenes = function() {
	var size = 2000000;
	var bits = bitflags(size);
	bits.fill();
	bits.set(0,0);
	var lim = Math.ceil(Math.sqrt(size));
	for(var i=2;i<=lim;i++) {
		if(bits.get(i)){
			for(var j=i*i;j<=size;j+=i) {
				bits.set(j,0);
			}
		}
	};

	return function(n){ return bits.get(n); };
};
```