const assign = require('object-assign')
const arrify = require('arrify')
const micromatch = require('micromatch')
const path = require('path')
const readPkgUp = require('read-pkg-up')
const requireMainFilename = require('require-main-filename')

function TestExclude (opts) {
  assign(this, {
    cwd: process.cwd(),
    include: false,
    configKey: null, // the key to load config from in package.json.
    configPath: null, // optionally override requireMainFilename.
    configFound: false
  }, opts)

  if (!this.include && !this.exclude && this.configKey) {
    assign(this, this.pkgConf(this.configKey, this.configPath))
  }

  if (!this.exclude || !Array.isArray(this.exclude)) {
    this.exclude = exportFunc.defaultExclude
  }

  if (this.include && this.include.length > 0) {
    this.include = prepGlobPatterns(arrify(this.include))
  } else {
    this.include = false
  }

  this.exclude = prepGlobPatterns(
    [].concat(arrify(this.exclude))
  )
}

TestExclude.prototype.shouldInstrument = function (filename, relFile) {
  relFile = relFile || path.relative(this.cwd, filename)

  // Don't instrument files that are outside of the current working directory.
  if (/^\.\./.test(path.relative(this.cwd, filename))) return false

  relFile = relFile.replace(/^\.[\\\/]/, '') // remove leading './' or '.\'.
  return (!this.include || micromatch.any(relFile, this.include)) && !micromatch.any(relFile, this.exclude)
}

TestExclude.prototype.pkgConf = function (key, path) {
  const obj = readPkgUp.sync({
    cwd: path || requireMainFilename(require)
  })

  if (obj.pkg && obj.pkg[key] && typeof obj.pkg[key] === 'object') {
    this.configFound = true
    return obj.pkg[key]
  } else {
    return {}
  }
}

function prepGlobPatterns (patterns) {
  return patterns.reduce(function (result, pattern) {
    // Allow gitignore style of directory exclusion
    if (!/\/\*\*$/.test(pattern)) {
      result = result.concat(pattern.replace(/\/$/, '') + '/**')
    }
    return result.concat(pattern)
  }, [])
}

var exportFunc = function (opts) {
  return new TestExclude(opts)
}

exportFunc.defaultExclude = [
  'test/**',
  'test{,-*}.js',
  '**/*.test.js',
  '**/__tests__/**',
  '**/node_modules/**'
]

module.exports = exportFunc
