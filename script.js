const {Map, List} = require('immutable-ext');
const Task = require('data.task')


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

const Box = x => ({
    fold: f => f(x),
    map: f => Box(f(x)),
    inspect: () => `Box(${x})`
})

const LazyBox = g => ({
    fold: f => f(g()),
   map: f => LazyBox(() => f(g()))
})

const res = Box('  64  ')
            .map(abba => abba.trim())
            .map(trimmed => new Number(trimmed))
            .map(number => number + 1)
            .map(x => String.fromCharCode(x))
            .fold(x => x.toLowerCase())

const res_lazy = LazyBox(() => '  64  ')
    .map(abba => abba.trim())
    .map(trimmed => new Number(trimmed))
    .map(number => number + 1)
    .map(x => String.fromCharCode(x))
    .fold(x => x.toLowerCase())


Task.of(1)
  .fork(
    e => console.log('err', e),
    x => console.log('success', x)
  )

Task.of(1)
  .map(x => x + 1)
  .chain(x => Task.of(x + 1))
  .fork(
    e => console.log('err, e'),
    x => console.log('success', x)
  )

  const launchMissiles = () =>
    new Task((rej, res) => {
      console.log('launch missles')
      res('missle')
    })

launchMissiles()
  .map(x => x + '!')
  .fork(
    e => console.log('err', e),
    x => console.log('success', x)
  )

const app = launchMissiles().map(x => x + '!')

app.fork(
  e => console.log('err', e),
  x => console.log('success', x)
)