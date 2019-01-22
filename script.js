const {Map, List} = require('immutable-ext');

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

const res_map = Map({
      brian: 3,
      sara: 5
    })
    .map(x => Sum(x))
    .fold(Sum.empty())

console.log(res_map);

const res_list = List.of(1,2, 3)
                // .map(Sum)
                // .fold(Sum.empty())
                .foldMap(Sum, Sum.empty())
console.log(res_list);
