'use strict';

function GeoCoordinates(lat, lon){
    if (lat < -90 || lat > 90) {
        throw new RangeError('latitude out of range: -90 <= latitude <= 90');
    }
    if (lon <= -180 || lon > 180) {
        throw new RangeError('latitude out of range: -180 < latitude <= 180');
    }
    Object.defineProperty(this, 'latitude', {value: lat});
    Object.defineProperty(this, 'longitude', {value: lon});
}

GeoCoordinates.prototype.toString = function(){
    // TODO test
    var north = this.latitude > 0;
    var east = this.longitude > 0;
    var latitude = north ? '' + this.latitude + 'N' : '' + (-1 * this.latitude) + 'S';
    var longitude = east ? '' + this.longitude + 'E' : '' + (-1 * this.longitude) + 'W';
    return latitude + ', ' + longitude;
};

GeoCoordinates.prototype.round = function(dp){
    var latitude = parseFloat(this.latitude.toFixed(dp));
    var longitude = parseFloat(this.longitude.toFixed(dp));
    return GeoCoordinates.create(latitude, longitude);
};

GeoCoordinates.create = function(lat, lon){
    return new GeoCoordinates(lat, lon);
};

GeoCoordinates.from_place = function(place) {
    // TODO test
    return new GeoCoordinates(place.latitude, place.longitude);
};

GeoCoordinates.parse = function(address) {
    var match, latitude, longitude;
    if (match = address.match(/(\d+)([NS])[,\.]?\s*(\d+)([EW])/i)) {
        latitude = /N/i.test(match[2]) ? parseFloat(match[1]) : - parseFloat(match[1]);
        longitude = /E/i.test(match[4]) ? parseFloat(match[3]) : - parseFloat(match[3]);
        return {latitude: latitude, longitude: longitude};
    } else if (match = address.match(/(\d+)([EW])[,\.]?\s*(\d+)([NS])/i)) {
        latitude = /N/i.test(match[4]) ? parseFloat(match[3]) : - parseFloat(match[3]);
        longitude = /E/i.test(match[2]) ? parseFloat(match[1]) : - parseFloat(match[1]);
        return {latitude: latitude, longitude: longitude};
    } else if (match = address.match(/(-?\d+), (-?\d+)/)) {
        latitude = parseFloat(match[1]);
        longitude = parseFloat(match[2]);
        return {latitude: latitude, longitude: longitude};
    } else {
        return null;
    }
};

module.exports = GeoCoordinates;
