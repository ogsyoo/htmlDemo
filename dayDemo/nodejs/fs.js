var fs = require("fs")
var iconv = require('iconv-lite');
var path = './dayDemo/static'
//创建文件夹
fs.mkdir(path,function(err){
    console.log(err);
})
fs.readdir(path, function(err, files) {
    if (err) {
        throw err;
    }
    // files是一个数组
    // 每个元素是此目录下的文件或文件夹的名称
    console.log(files);
});
//查看文件信息
fs.stat('d:/2.txt', function (err, data) {
    console.log(data);
})
//删除文件
fs.unlink('d:/1.txt', function (err) {
    if (err) {
       console.log(err)
    }
    console.log("result: 成功删除了文件");
})
//读文件
fs.readFile('d:/2.txt', function (err, data) {
    console.log(data.toString())
    console.log(iconv.decode(data, "gb2312"))
})
//追加写文件
/**
 * flags值及说明如下:
    r ：读取文件，文件不存在时报错；
    r+ ：读取并写入文件，文件不存在时报错；
    rs ：以同步方式读取文件，文件不存在时报错；
    rs+ ：以同步方式读取并写入文件，文件不存在时报错；
    w ：写入文件，文件不存在则创建，存在则清空；
    wx ：和w一样，但是文件存在时会报错；
    w+ ：读取并写入文件，文件不存在则创建，存在则清空；
    wx+ ：和w+一样，但是文件存在时会报错；
    a ：以追加方式写入文件，文件不存在则创建；
    ax ：和a一样，但是文件存在时会报错；
    a+ ：读取并追加写入文件，文件不存在则创建；
    ax+ ：和a+一样，但是文件存在时会报错。
 */
fs.writeFile(path+"/2.txt","tets,test",{flag:'a'},function(err,data){
    if(err){
        console.log(err);
    }else{
        console.log("写入成功")
        fs.readFile(path+"/2.txt",function(err,data){
            console.log("写入的内容是:"+data)
        })
    }
})
// 打开文件
fs.open(path+"/2.txt", 'r', function(err, fd) {
    if (err) {
        throw err;
    }
    console.log('open file success.');
    var buffer = new Buffer(255);
    // 读取文件
    fs.read(fd, buffer, 0, 10, 0, function(err, bytesRead, buffer) {
        if (err) {
            throw err;
        }
        // 打印出buffer中存入的数据
        console.log(bytesRead, buffer.slice(0, bytesRead).toString());
        // 关闭文件
        fs.close(fd);
    });
});
// 打开文件 读
fs.open(path+'/testwrite.txt', `w`, function(err, fd) {
    if (err) {
        throw err;
    }
    console.log('open file success.');
    var buffer = new Buffer('shiyanlou');
    // 读取文件
    fs.write(fd, buffer, 0, 6, 0, function(err, bytesWritten, buffer) {
        if (err) {
            throw err;
        }
        console.log('write success.');
        // 打印出buffer中存入的数据
        console.log(bytesWritten, buffer.slice(0, bytesWritten).toString());
        // 关闭文件
        fs.close(fd);
    });
});
//写文件 写
var str = '# Kibana is served by a back end server. This setting specifies the port to use.\n#server.port: 5601\n\n# Specifies the address to which the Kibana server will bind. IP addresses and host names are both valid values.\n# The default is \'localhost\', which usually means remote machines will not be able to connect.\n# To allow connections from remote users, set this parameter to a non-loopback address.\n#server.host: "localhost"\n\n# Enables you to specify a path to mount Kibana at if you are running behind a proxy. This only affects\n# the URLs generated by Kibana, your proxy is expected to remove the basePath value before forwarding requests\n# to Kibana. This setting cannot end'
fs.writeFile(path+"/1.txt",str,function(err,data){
    if(err){
        console.log(err);
    }else{
        console.log("写入成功")
        fs.readFile(path+"/1.txt",function(err,data){
            console.log("写入的内容是:"+data)
        })
    }
})

