// Brad's super secret, super hacky map impl. Is best, bro
var async = require('async');

function HackMap() {
    var values = [];
    var keys = [];

    this.values = function() {
        return values.slice(0);
    }

    this.keys = function() {
        return keys.slice(0);
    }

    this.size = function() {
        return values.length;
    }

    this.get = function(key) {
        if(!key) return;

        var i = keys.indexOf(key);
        if(i >= 0) {
            return values[i];
        }
    }

    this.containsKey = function(key) {
        if(!key) return false;

        var i = keys.indexOf(key);
        return i >= 0;
    }

    this.put = function(key, value) {
        if(!key || !value) throw "Cannot put into map, key or value is invalid: " + key + " => " + value;

        if(this.containsKey(key)) {
            var i = keys.indexOf(key);
            values[i] = value;
        } else {
            keys.push(key);
            values.push(value);
        }
    }

    this.remove = function(key) {
        if(!key) throw "Key is invalid: " + key;

        var i = keys.indexOf(key);
        if(i >= 0) {
            values.splice(i, 1);
            keys.splice(i, 1);
        }
    }

    this.forEach = function(func, onFinish) {
        if (func && values && values.length > 0) {
            async.each(values, func, onFinish);
        } else if (onFinish) {
            onFinish();
        }
    }
}

module.exports = HackMap;
