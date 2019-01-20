
const fs = require('fs');

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


const fromNullable = x =>
  x != null ? Right(x) : Left(null)

const getPort = () => {
  try {
    const str = fs.readFileSync('./cofig.json')
    const config = JSON.parse(str)
    return config.port
  } catch(e) {
    return 3000
  }
}

const result = getPort()
console.log(result);
