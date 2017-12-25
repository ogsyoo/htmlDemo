// Object.prototype.bar = 'bar';
// function Student(name, age) {
//     this.name = name;
//     this.age = age;
// }
// Student.prototype.sex = "nan";
// Student.bar;
// var xiaoming = new Student('xiaoming', 20);
// xiaoming.sex = 'nv';
// console.log(xiaoming.hasOwnProperty('sex'));
// console.log(xiaoming);
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getInfo() {
        return "name" + " : " + this.name + " || age : " + this.age;
    }
}
class Student extends Person {
    constructor(name, age, sNo) {
        super(name, age);
        this.sNo = sNo;
    }
    getInfo() {
        return "name" + " : " + this.name + " || age : " + this.age + " || sNo : " + this.sNo;
    }
}



var p1 = new Person('gsy', 10);
console.log(p1.getInfo());
var s1 = new Student('gsy', 10, 20132225);
console.log(s1.getInfo());





// class Student {
//     constructor(name) {
//         this.name = name;
//     }
//     hello() {
//         console.log('Hello, ' + this.name + '!');
//     }
// }


// class PrimaryStudent extends Student {
//     constructor(name, grade) {
//         super(name); // 记得用super调用父类的构造方法!
//         this.grade = grade;
//     }
//     myGrade() {
//         console.log('I am at grade ' + this.grade);
//     }
// }

// var xiaoming = new Student('小明');
// xiaoming.hello();
// var s = new PrimaryStudent('小明','一般');
// s.myGrade();





var obj = {
    name:"name",
    ae:"age"
}
console.log(obj.name.isValid);
for(var key in obj){
    console.log(key,'--->',obj[key]);
}
var A = function (name, age) {
    this.name = name;
    this.age = age;
    this.sleep = function () {
        console.log(this.name, '|', this.age, '  内部方法')
    }
};
A.prototype.fun2 = function () {
    console.log(this.name, '|', this.age, '这是原型方法');
}
var a = new A();
console.log(a.__proto__); //A {}（即构造器function A 的原型对象）
console.log(a.__proto__.__proto__); //Object {}（即构造器function Object 的原型对象）
console.log(a.__proto__.__proto__.__proto__); //null
function B(name, age) {
    A.call(this);
    this.name = name || 'gw';
    this.age = age || 30;
}
var b = new B();
b.sleep();
// b.fun2();
B.prototype = new A();
B.name = 'gw';
B.age = 20;
var b = new B();
b.fun2();
b.sleep();