'use strict';

var test = require('tape');
var GC = require('geo-coordinates');

test('creation sets latitude', function(t){
    var coordinate = GC.create(10, 20);
    t.equal(10, coordinate.latitude);
    t.end();
});

test('creation sets longitude', function(t){
    var coordinate = GC.create(10, 20);
    t.equal(20, coordinate.longitude);
    t.end();
});

test('latitude are immutable', function(t){
    var coordinate = GC.create(10, 20);
    t.throws(function () {
        coordinate.latitude = 27;
    }, TypeError);
    t.end();
});

test('longitude are immutable', function(t){
    var coordinate = GC.create(10, 20);
    t.throws(function () {
        coordinate.longitude = 27;
    }, TypeError);
    t.end();
});

test('throws error for low latitude value', function (t) {
    t.throws(function(){
        GC.create(-91, 0);
    }, RangeError);
    t.end();
});

test('throws error for high latitude value', function (t) {
    t.throws(function(){
        GC.create(91, 0);
    }, RangeError);
    t.end();
});

test('throws error for low longitude value', function (t) {
    t.throws(function(){
        GC.create(40, -180);
    }, RangeError);
    t.end();
});

test('throws error for high longitude value', function (t) {
    t.throws(function(){
        GC.create(40, 181);
    }, RangeError);
    t.end();
});
