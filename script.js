const {Map} = require('immutable-ext');

const Sum = x => ({
x,
concat: ({x: y}) => 
  Sum(x + y),
inspect: () =>
  `Sum(${x})`
})

const All = x => ({
  x,
  concat: ({x: y}) => 
    All(x && y),
  inspect: () =>
    `All(${x})`
})

const First = x => ({
  x,
  concat: _ => 
    First(x),
  inspect: () =>
    `First(${x})`
})

const acc1 = Map({
    name: First('nico'),
    isPaid: All(true),
    points: Sum(10),
    friends: ['Franklin']
})

const acc2 = Map({
    name: First('nico'),
    isPaid: All(false),
    points: Sum(2),
    friends: ['Gatsby']
})

const res = acc1.concat(acc2)
console.log(res.toJS());