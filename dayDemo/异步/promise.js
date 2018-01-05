function asyncPromiss() {
    var p = new Promise(function (resovle, reject) {
        setTimeout(function () {
            //随机产生1-10的数组
            var num = Math.ceil(Math.random() * 10);
            if (num < 5) {
                resovle(num);
            } else {
                reject("数字太大了");
            }
        }, 0)
    })
    return p;
}
function cat() {
    var p = new Promise(function (resovle, reject) {
        asyncPromiss()
            .then(
            function (data) {
                console.log(data);
                resovle(data)
                console.log("==================================================");
            })
            .catch(function (reason) {
                console.log('错误');
                console.log(reason);
                resovle('不写的话，下面就断了');
                console.log("==================================================");
            });
    })
    return p;
}
function asyncPromiss1() {
    console.log("线程1开始执行");
    var p = new Promise(function (resovle, reject) {
        setTimeout(function () {
            resovle("异步线程1执行完成");
        }, 30)
    })
    return p;
}
function asyncPromiss3() {
    console.log("线程3开始执行");
    var p = new Promise(function (resovle, reject) {
        setTimeout(function () {
            resovle("异步线程3执行完成");
        }, 10)
    })
    return p;
}
function asyncPromiss2() {
    console.log("线程2开始执行");
    var p = new Promise(function (resovle, reject) {
        setTimeout(function () {
            resovle("异步线程2执行完成");
        }, 0)
    })
    return p;
}
//按照顺序执行
function auto() {
    var p = new Promise(function (resovle, reject) {
        asyncPromiss1().then(function (data) {
            console.log(data);
            return asyncPromiss2();
        }).then(function (data) {
            console.log(data);
            return asyncPromiss3();
        }).then(function (data) {
            console.log(data);
            console.log("==================================================");
            resovle(data);
        })
    })
    return p;
}
cat().then(function (data) {
    return auto();
}).then(function (data) {
    return all();
}).then(function (data) {
    return rect();
});
//并行执行 执行完毕才输出
function all() {
    var p = new Promise(function (resovle, reject) {
        Promise
            .all([asyncPromiss1(), asyncPromiss2(), asyncPromiss3()])
            .then(function (res) {
                console.log(res)
            }).then(function () {
                resovle();
                console.log("==================================================");
            });
    })
    return p;
}
//并行执行，谁先执行完成就完成
function rect() {
    var p = new Promise(function (resovle, reject) {
        Promise
            .race([asyncPromiss1(), asyncPromiss2(), asyncPromiss3()])
            .then(function (res) {
                console.log(res)
            });
    })
}