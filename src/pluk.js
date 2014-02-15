'use strict';

var request = require('request');
var when = require('when');

var pluk = module.exports = {
	debug: false,
	hood: function hood(search) {
		return new Hood(search);
	}
};

var FORCES = plgrab('forces').then(function(forces) {
	var f = {};
	for (var i in forces) {
		if ({}.hasOwnProperty.call(forces, i)) {
			f[forces[i].id] = forces[i];
		}
	}
	return f;
});

function grab(url) {
	pluk.debug && console.log('Pluk: GET:', url)
	return when.promise(function(resolve, reject, notify) {
		request(url, function(err, response, body) {
			if (err) reject(err);
			else if (/^not found/i.test(body)) reject(body)
			else resolve(JSON.parse(body));
		});
	});
}

function plgrab(path) {
	return grab('http://data.police.uk/api/' + path);
}

function Hood(search) {
	var t = this;
	this._hood = typeof search == 'string' ?
		grab('http://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(search) + '&sensor=false').then(function(l) {
			return t._getByLatLng(l.results[0].geometry.location);
		}) :
		this._getByLatLng(search[0], search[1]);
}

Hood.prototype = {
	info: function() {
		return this._hood.then(function(nData) {
			return plgrab(nData.force+'/'+nData.neighbourhood);
		});
	},
	boundary: function() {
		return this._hood.then(function(nData) {
			return plgrab(nData.force+'/'+nData.neighbourhood+'/'+'boundary');
		});
	},
	people: function() {
		return this._hood.then(function(nData) {
			return plgrab(nData.force+'/'+nData.neighbourhood+'/'+'people');
		});
	},
	events: function() {
		return this._hood.then(function(nData) {
			return plgrab(nData.force+'/'+nData.neighbourhood+'/'+'events');
		});
	},
	priorities: function() {
		return this._hood.then(function(nData) {
			return plgrab(nData.force+'/'+nData.neighbourhood+'/'+'priorities');
		});
	},
	_getByLatLng: function(loc) {
		return grab('http://data.police.uk/api/locate-neighbourhood?q='+loc.lat+','+loc.lng).then(null, function(err) {
			var e = new Error('Cannot locate neighbourhood @ ' + [loc.lat, loc.lng]);
			e.detail = err;
			throw e;
		});
	}
};