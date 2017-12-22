let data = [{
    id: 1,
    name: 'a',
    parent_id: 0
}, {
    id: 2,
    name: 'b',
    parent_id: 0
}, {
    id: 3,
    name: 'a-1',
    parent_id: 1
}, {
    id: 4,
    name: 'a-2',
    parent_id: 1
}, {
    id: 5,
    name: 'b-1',
    parent_id: 2
}, {
    id: 6,
    name: 'b-2',
    parent_id: 2
}, {
    id: 7,
    name: 'a-1-1',
    parent_id: 3
}, ];
let result = data.reduce(function(prev, item) {
    console.log(prev,'---->',item);
    prev[item.parent_id] ? prev[item.parent_id].push(item) : prev[item.parent_id] = [item];
    return prev;
}, {});
for (let prop in result) {
    result[prop].forEach(function(item, i) {
        result[item.id] ? item.children = result[item.id] : ''
    });
}
result = result[0];
console.log(JSON.stringify(result))







// var obj = {
//     name:"name",
//     ae:"age"
// }
// console.log(obj.name.isValid);
// var arr = [1,2,3,4];
// for(var key in obj){
//     console.log(key,'--->',obj[key]);
// }
// arr.map(function(item){
//     console.log(item);
// })

// var A = function (name, age) {
//     this.name = name;
//     this.age = age;
//     this.sleep = function () {
//         console.log(this.name, '|', this.age, '  内部方法')
//     }
// };
// A.prototype.fun2 = function () {
//     console.log(this.name, '|', this.age, '这是原型方法');
// }
// var a = new A();
// console.log(a.__proto__); //A {}（即构造器function A 的原型对象）
// console.log(a.__proto__.__proto__); //Object {}（即构造器function Object 的原型对象）
// console.log(a.__proto__.__proto__.__proto__); //null
// function B(name, age) {
//     A.call(this);
//     this.name = name || 'gw';
//     this.age = age || 30;
// }
// var b = new B();
// b.sleep();
// b.fun2();



// B.prototype = new A();
// B.prototype.name = 'gw';
// B.prototype.age = 20;
// var b = new B();
// b.fun2();
// b.sleep();



