var async = require('async');
var util = require('util');
async.auto({
    func1: function (callback, results) {
        callback(null, "abc", "bbc");
    },

    func2: function (callback, results) {
        console.log("Print#1:\n" + util.inspect(results));
        callback(null, { "puncha": "during" });
    },
    func3: ["func2", function (callback, results) {
        console.log("Print#2:\n" + util.inspect(results));
        callback(null, 3);
    }],
    func4: ["func1", "func3", function (callback, results) {
        console.log("Print#3:\n" + util.inspect(results));
        callback(null);
    }]
});
