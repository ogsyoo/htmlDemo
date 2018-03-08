var fs = require("fs");
var async = require("async");
const bufs = [];
fs.open('d:/2.txt', 'r+', function (err, fd) {
    var length = 0;
    var all;
    async.series({
        getLength: function (cb) {
            fs.stat('d:/2.txt', function (err, stat) {
                all = stat.size
                length = Math.ceil(stat.size / 225);
                cb(null, length)
            })
        },
        add: function (cb) {
            for (let i = 0; i < length; i++) {
                let buf = new Buffer(225);
                //读取fd文件内容到buf缓存区
                var start = 225;
                if (i == length - 1)
                    start = all - i * 225
                fs.read(fd, buf, 0, 225, i * 225, function (err, bytesRead, buffer) {
                    if (buffer)
                        addBuff(i, buffer);
                    if (i == length - 1) cb(null, "add")
                });
            }
        },
        show: function (cb) {
            cb(null, bufs.toString());
        },
        write: function (cb) {
            fs.writeFile("d:/21.txt", bufs, function (err, data) {
                if (err)
                    cb(err)
                cb("写入成功");
            })
        },
        close: function (cb) {
            fs.close(fd);
            cb(null, "close")
        }
    }, function (err, res) {
        console.log(res)
    })

});
function addBuff(size, buffer) {
    // console.log("==========================", bufs.length,"===========================")
    bufs[size] = buffer;
    // console.log(bufs.toString());
    // console.log("=====================================================")
}
function pipe(source,target) {
 
    let rs=fs.createReadStream(source,{highWaterMark:4});
    let ws=fs.createWriteStream(target,{highWaterMark:1});
    //可读流到可写流,异步操作，可以保证内存不会被淹没，读一点，写一点
    // 如果想看文件类容，使用readFile
   
    rs.pipe(ws);
  }
  pipe('./1.txt','./4.txt')