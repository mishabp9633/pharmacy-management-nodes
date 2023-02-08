'use strict';

var test = require('tape');
var GC = require('geo-coordinates');

test('should round the latitude', function(t){
    var coordinates = GC.create(10.1234, 20.1234).round();
    t.equal(10, coordinates.latitude);
    t.end();
});

test('should round the longitude', function(t){
    var coordinates = GC.create(10.1234, 20.1234).round();
    t.equal(20, coordinates.longitude);
    t.end();
});

test('should set latitiude precision to given decimal places', function(t){
    var coordinates = GC.create(10.1234, 20.1234).round(2);
    t.equal(10.12, coordinates.latitude);
    t.end();
});

test('should set longitude precision to given decimal places', function(t){
    var coordinates = GC.create(10.1234, 20.1234).round(2);
    t.equal(20.12, coordinates.longitude);
    t.end();
});
