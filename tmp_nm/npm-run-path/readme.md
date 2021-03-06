# npm-run-path [![Build Status](https://travis-ci.org/sindresorhus/npm-run-path.svg?branch=master)](https://travis-ci.org/sindresorhus/npm-run-path)

> Get your [PATH](https://en.wikipedia.org/wiki/PATH_(variable)) prepended with locally installed binaries

In [npm run scripts](https://docs.npmjs.com/cli/run-script) you can execute locally installed binaries by name. This enables the same outside npm.


## Install

```
$ npm install --save npm-run-path
```


## Usage

```js
const childProcess = require('child_process');
const npmRunPath = require('npm-run-path');

console.log(process.env.PATH);
//=> '/usr/local/bin'

console.log(npmRunPath());
//=> '/Users/sindresorhus/dev/foo/node_modules/.bin:/Users/sindresorhus/dev/node_modules/.bin:/Users/sindresorhus/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/usr/local/bin'

// `foo` is a locally installed binary
childProcess.execFileSync('foo', {
	env: {
		PATH: npmRunPath()
	}
});
```


## API

### npmRunPath([options])

#### options

##### cwd

Type: `string`  
Default: `process.cwd()`

Working directory.

##### path

Type: `string`  
Default: [`PATH`](https://github.com/sindresorhus/path-key)

PATH to be appended.<br>
Set it to an empty string to exclude the default PATH.


## Related

- [npm-run-path-cli](https://github.com/sindresorhus/npm-run-path-cli) - CLI for this module
- [execa](https://github.com/sindresorhus/execa) - Execute a locally installed binary


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
