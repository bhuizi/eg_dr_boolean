// 02
// const Box = x => ({
//   map: f => Box(f(x)),
//   fold: f => f(x),
//   inspect: () => `Box(${x})`
// })

// const moneyToFloat = str =>
//   Box(str)
//     .map(s => s.replace(/\$/g, ''))
//     .map(r => parseFloat(r))

// const percentToFloat = x => 
//   Box(x.replace(/\%/g, ''))
//     .map(replace => parseFloat(replace))
//     .map(number => number * 0.01)

// const applyDiscount = (price, discount) =>
//   moneyToFloat(price)
//   .fold(cost =>
//     percentToFloat(discount)
//     .fold(savings => cost - cost * savings
//     ))

// const result = applyDiscount('$5.00', '20%');


// const result = Box(3).map(num => num * 3);

// console.log(result);

//03

const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
});

const Left = x => ({
  map: () => Left(x),
  fold: (f, g) => f(x),
  inpspect: () => `Left(${x})`
});

const result = Right(3)
  .map(x => x + 1)
  .map(x => x/2)
  .fold(x => 'error', x => x);

const fromNullable = x =>
  x != null ? Right(x) : Left(null)

console.log(result);

const findColor = name => 
({red: '#ff4444', blue: '#3b5988', yellow: '#ffff68t'})[name]

const findColor_Refactor = name => {
  const found = ({red: '#ff4444', blue: '#3b5988', yellow: '#ffff68t'})[name]
  return found ? Right(found) : Left(null)
}

const findColor_Refactor_Three = name =>
  fromNullable({red: '#ff4444', blue: '#3b5988', yellow: '#ffff68t'}[name])



// const result2 = findColor('red');
// console.log(result2);
const result_two = findColor('red').slice(1).toUpperCase();
console.log(result_two);

const result_three = findColor_Refactor('red')
                      .map(c => c.slice(1))
                      .fold(e => 'no color',
                            c => c.toUpperCase())
console.log(result_three);

const result_four = findColor_Refactor_Three('blue')
                      .map(c => c.slice(1))
                      .fold(e => 'no color',
                            c => c.toUpperCase())
console.log(result_four);

// const Right = x =>
// ({
//   map: f => Right(f(x)),
//   inspect: () => `Right(${x})`
// })

// const Left = x =>
// ({
//   map: f => Left((x)),
//   inspect: () => `Left(${x})`
// })

// const result = Left(3).map(x => x + 1).map(x => x /2)
// console.log(result);