'use strict';

var request = require('request');
var when = require('when');

var pluk = module.exports = {
	debug: false,
	hood: function hood(search) {
		return new Hood(search);
	},
	direct: function(path) {
		return plgrab(path);
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
			else if (response.statusCode != 200) reject(body)
			else resolve(JSON.parse(body));
		});
	});
}

function plgrab(path) {
	return grab('http://data.police.uk/api/' + path);
}

function Hood(search) {
	var t = this;
	this.search = search;
	this._hood = typeof search == 'string' ?
		grab(
			'http://maps.googleapis.com/maps/api/geocode/json?' + 
				[
					'address=' + encodeURIComponent(search),
					'sensor=false',
					'region=UK'
				].join('&')
		).then(function(l) {
			return t._getByLatLng(l.results[0].geometry.location);
		}) :
		this._getByLatLng({ lat: search[0], lng: search[1] });
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
		var t = this;
		var lat = loc.lat;
		var lng = loc.lng;
		return plgrab('locate-neighbourhood?q='+lat+','+lng).then(null, function(err) {
			var e = new Error('Cannot locate neighbourhood @ ' + [lat, lng]);
			e.detail = err;
			e.search = t.search;
			throw e;
		});
	}
};