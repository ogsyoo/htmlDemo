
var co = require('co');
var fs = require('fs');
var readFile = require('fs-readfile-promise');


co(function* () {
    var r1 = yield readFile('d:/dept.json')
    console.log(123);
    console.log(r1.toString());
    var r2 = yield readFile('d:/1.txt');
    console.log(r2.toString());
}).then(() => {
    console.log("执行完成");
}).catch((error) => {
    console.log(error);
})
// co(function* () {
//     var r1 = yield fs.readFile('d:/dept.json');
//     console.log(r1);
//     var r2 = yield fs.readFile('d:/1.txt');
//     console.log(r1);
// }).then(() => {
//     console.log("执行完成");
// }).catch((error) => {
//     console.log(error);
// });


// 前台传入的:
// width   视频播放窗口的宽度
// height  视频播放窗口的高度
// palytype    视频播放的请求类型 （PlayReal,PlayBack）
// camlist    监控信息中的indexCode
// wndcount  视频窗口子窗口的数量
// wndselect 选中在哪个窗口播放
// 后台获取的:
// svrIp
// appkey
// appSecret
// time
