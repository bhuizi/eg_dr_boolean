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

Sum.empty = () => Sum(0);

const res = Sum.empty().concat(Sum(1).concat(Sum(2)))
console.log(res);

All.empty = () => All(true);

const res_all = All(true).concat(All(true).concat(All.empty()))
console.log(res_all);

const sum = xs =>
  xs.reduce((acc, x) => acc + x, 0)

const all = xs =>
  xs.reduce((acc, x) => acc && x, true)

