function People(name,age){
    this.name = name,
    this.age = age,
    this.getAge = function(){
        return this.age;
    }
}

var people = new People("gsy","24");
console.dir(people)
var UUID = require('uuid');
console.log(UUID.v1());//基于时间戳生成
console.log(UUID.v4());//随机生成