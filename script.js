
const fs = require('fs');

const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
});

const Left = x => ({
  map: () => Left(x),
  fold: (f, g) => f(x),
  inpspect: () => `Left(${x})`
});

const tryCatch = f => {
  try {
    return Right(f())
  }catch(e){
    return Left(e)
  }
}
const fromNullable = x =>
  x != null ? Right(x) : Left(null)

// const getPort = () => {
//   try {
//     const str = fs.readFileSync('./config.json')
//     const config = JSON.parse(str)
//     return config.port
//   } catch(e) {
//     return 3000
//   }
// }

const getPort = () =>
  tryCatch(() => fs.readFileSync('./config.json'))
    .map(c => JSON.parse(c))
    .fold(e => 3000,
        c => c.port
      )

const result = getPort()
console.log(result);
