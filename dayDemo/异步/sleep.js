// var async = require('async');

function wait(time) {
    var newTime = new Date().getTime();
    while (new Date().getTime() < newTime + time);
}

var time = 5000;
// console.log("现在是 ： ", new Date().toLocaleTimeString());
console.time('time');
console.log("休眠 ", time / 1000, "秒");
wait(time);
// console.log("现在是 ： ", new Date().toLocaleTimeString());
console.timeEnd('time');


























// console.log('begin');
// var i = 0;

// setTimeout(function(){
//     i++;
//     console.log('end');
// },2000);
// console.log(i);
// function a (){
//     console.log("next");
// }
// a();
// console.log('其他的函数');


// var set = new Set();
// set.add('a');

// function foo() {
//     var y = 'Bob';
//     var x = 'Hello, ' + y;
//     console.log(x);
// }
// foo();





// // async.parallel({
// //     one: function (callback) {
// //         console.log('one');
// //         callback(null, 'one');
// //     },
// //     two: function (callback) {
// //         console.log('two');
// //         callback(null, 'two');
// //     },
// //     three: function (callback) {
// //         console.log('three');
// //         callback(null, 'three');
// //     }
// // }, function (err, result) {
// //     console.log(result);
// // });




// // var res = [1,2,3];
// // var err = {
// //     err:"这是一个错误"
// // };
// // var fun1 = function (a, err, result) {
// //     if (err) {
// //         console.log("err "+err);
// //     } else {
// //         console.log("a  "+a);//err
// //         console.log("result "+result);//temp
// //     }
// // }
// // var res ={
// //     a:"sda",
// //     b:"b",
// //     c:"c"
// // };
// // var rse = [1,2,3];
// // console.log(rse[0]);


// // console.log(rse.map(function(num){
// //     return num*num;
// // }));
// // console.log(res.map(function(){
// //     return res;
// // }));













// // var b = fun1.bind(null,"a");//fun1(err,null,null);
// // b(null,"result");
// // var first = function (id, callback) {
// //     console.log("我是第一个函数");
// //     callback(null, "1");
// // };
// // var second = function (callback) {
// //     console.log("我是第二个函数");
// //     callback(null, "2");
// // };
// // var third = function (id, callback) {
// //     console.log("我是第三个函数");
// //     callback(null, "3");
// // };
// // var myFun = function (callback) {
// //     async.waterfall([second, first, third], function (err, data) {
// //         if (err) {
// //             console.log(err);
// //         } else {
// //             console.log(data);
// //         }
// //     });
// // };

