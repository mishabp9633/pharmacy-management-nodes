'use strict';

var test = require('tape');
var GC = require('geo-coordinates');

test('should return nil for blank string', function(t){
    var location = GC.parse('');
    t.equal(null, location);
    t.end();
});

test('should recognise 10N 30E', function(t){
    var location = GC.parse('10N 30E');
    t.equal(10, location.latitude);
    t.equal(30, location.longitude);
    t.end();
});

test('should recognise 10S 40E', function(t){
    var location = GC.parse('10S 40E');
    t.equal(-10, location.latitude);
    t.equal(40, location.longitude);
    t.end();
});

test('should recognise "10N 40W"', function(t){
    var location = GC.parse('10N 40W');
    t.equal(10, location.latitude);
    t.equal(-40, location.longitude);
    t.end();
});

test('should recognise " 10N  30E  " with white space', function(t){
    var location = GC.parse(' 10N  30E  ');
    t.equal(10, location.latitude);
    t.equal(30, location.longitude);
    t.end();
});

test('should recognise "10N, 30E" with separator', function(t){
    var location = GC.parse('10N, 30E');
    t.equal(10, location.latitude);
    t.equal(30, location.longitude);
    t.end();
});

test('should recognise "10N,30E" with separator no white space', function(t){
    var location = GC.parse('10N,30E');
    t.equal(10, location.latitude);
    t.equal(30, location.longitude);
    t.end();
});

test('should recognise 10n 30e lowercase', function(t){
    var location = GC.parse('10n 30e');
    t.equal(10, location.latitude);
    t.equal(30, location.longitude);
    t.end();
});

test('should recognise "10N. 30E" with fullstop separator', function(t){
    var location = GC.parse('10N. 30E');
    t.equal(10, location.latitude);
    t.equal(30, location.longitude);
    t.end();
});

test('should recognise "10, 30"', function(t){
    var location = GC.parse('10, 30');
    t.equal(10, location.latitude);
    t.equal(30, location.longitude);
    t.end();
});

test('should recognise "-10, -30"', function(t){
    var location = GC.parse('-10, -30');
    t.equal(-10, location.latitude);
    t.equal(-30, location.longitude);
    t.end();
});

test('should recognise 30E 10N reversed', function(t){
    var location = GC.parse('30E 10N');
    t.equal(10, location.latitude);
    t.equal(30, location.longitude);
    t.end();
});
