// example 01
const openSite = () => {
  if(current_user) {
      return renderPage(current_user)
  } else {
      return showLogin()
  }
}

cosnt openSite = () => 
  fromNullable(current_user)
  .fold(showLogin, renderPage)

// example 02
const getPrefs = user => {
  if(user.premium) {
      return loadPrefs(user.preferences)
  } else {
      return defaultPrefs
  }
}

const getPrefs = user =>
  (user.premium ? Right(user) : Left('not premium'))
  .map(u => u.preferences)
  .fold(() => defaultPrefs, prefs => loadPrefs(prefs))

// example 03
const streetName = user => {
  const address = user.address

  if(address) {
      const street = address.street

      if(street) {
          return street.name
      }
  }
  return 'no street'
}

const streetName = user =>
  fromNullable(user.address)
  .chain(a => frommNullable(a.street))
  .map(s => s.name)
  .fold(e => 'no street', n => n)

// example 04
  const concatUniq = (x, ys) => {
    const found = ys.filter(y => y === x)[0]
    return found ? ys : ys.concat(x)
}

const concatUniq = (x, ys) =>
    fromNullable(ys.filter(y => y === x)[0])
    .fold(() => ys.concat(x), y => ys)

//example 05
const wrapExamples = example => {
  if(example.previewPath) {
      try {
          example.preview = fs.readFileSync(example.previewPath)
      } catch(e) { }
  }
  return example
}

const readFile = x => tryCatch(() => fs.readFileSync(x))

const wrapExample = example =>
  fromNullable(example.previewPath)
  .chain(readFile)
  .fold(() => example,
        ex => Object.assign({preview: p}, ex))

// example 06
const parseDbUrl = cfg => {
  try {
      const c = JSON.parse(cfg)
      if(c.url) {
          return c.url.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
      }
  } catch(e) {
      return null
  }
}

const parseDbUrl = cfg =>
  tryCatch(() => JSON.parse(cfg))
  .chain(c => fromNullable(c.url))
  .fold(e => null,
        u => u.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/))