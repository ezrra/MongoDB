-- Windows BSON

try {
	// Load the precompiled win32 binary
	if(process.platform == "win32" && process.arch == "x64") {
 		//bson = require('./win32/x64/bson');  
 		bson = require('../browser_build/bson'); //wk for failed to load c++ bson extension
	} else if(process.platform == "win32" && process.arch == "ia32") {
		//	 bson = require('./win32/ia32/bson');  
 		bson = require('../browser_build/bson'); //wk for failed to load c++ bson extension
	} else {
 		//bson = require('../build/Release/bson');
 		bson = require('../browser_build/bson'); //wk for failed to load c++ bson extension
	}	
} catch(err) {
	console.error("Failed to load c++ bson extension, using pure JS version");
	bson = require('../lib/bson/bson');
}