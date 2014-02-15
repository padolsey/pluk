var pluk = require('./src/pluk');

pluk.hood('Westminster, London').info().then(function(result) {
	console.warn('Result:', result);
}, function(err) {
	console.warn('Error!', err);
});