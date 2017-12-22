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