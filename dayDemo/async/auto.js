var async = require('async');
var util = require('util');
console.time("auto");
async.auto({
    getData: function (cb) {
        console.log('第一步, 获取数据')
        cb(null, 1)
    },
    makeDir: function (cb) {
        console.log('第二步,创建文件夹')
        cb(null, 2)
    },
    writeFile: ['getData', 'makeDir', function (rs, cb) {
        console.log("rs", "====>", rs);
        console.log('第三部, 写文件')
        cb(null, 3)
    }],
    sendEmail: ['writeFile', function (rs, cb) {
        console.log("rs", "====>", rs);
        console.log('第四步, 发送文档', rs)
        cb(null, 4)
    }]
}, function (err, rs) {
    console.log(err, rs, 'auto')
})
console.timeEnd('auto')