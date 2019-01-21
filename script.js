const Sum = x => ({
x,
concat: ({x: y}) => 
  Sum(x + y),
inspect: () =>
  `Sum(${x})`
})

const res = Sum(1).concat(Sum(2))
console.log(res);

const All = x => ({
  x,
  concat: ({x: y}) => 
    All(x && y),
  inspect: () =>
    `All(${x})`
})

const res_all = All(true).concat(All(false))
console.log(res_all);

const First = x => ({
  x,
  concat: _ => 
    First(x),
  inspect: () =>
    `First(${x})`
})

const res_first = First('next').concat(First('ice cream'))
console.log(res_first);

