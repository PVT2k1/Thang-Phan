// const a = () => console.log("a");
// const b = () => setTimeout(() => console.log("b"));
// const c = () => console.log("c")

// a()
// b()
// c()

// for (var i=0; i<3; i++) {
//     setTimeout(() => console.log(i), 1)
// }

// for (let i=0; i<3; i++) {
//     setTimeout(() => console.log(i), 1)
// }

// var a = [[0, 1], [2,3]].reduce((acc, cur) => {
//     return acc.concat(cur);
// }, [1,2]);

// console.log(a);

function f1 () {
    return new Promise ((rs, rj) => {
        console.log ('f1 pro');
        setTimeout(() => {
            console.log("f1 pro rs");
            rs();
        }, 1000);
    })
}

function f2() {
    console.log("f2");
    return new Promise ((rs, rj) => {
        console.log ('f2 pro');
        setTimeout(() => {
            console.log("f2 pro rs");
            rs();
        }, 500);
    })
}

f1()
f2()