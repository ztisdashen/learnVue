// eslint-disable-next-line no-unused-vars
let name = 'haha';
let flag = true;

function sum(a, b) {
    return a + b;
}

console.log(sum(30,40))
export {
    flag,sum,name
}
export function mul(a,b) {
    return a * b
}
export class Person {
    run(){

    }
}
// 一个js文件中只能有一个default
export default function () {
    console.log("heheehehehehe")
}