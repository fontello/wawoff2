woff2 for node.js (via WebAssembly)
===================================

[![Build Status](https://img.shields.io/travis/fontello/wawoff2/master.svg?style=flat)](https://travis-ci.org/fontello/wawoff2)
[![NPM version](https://img.shields.io/npm/v/wawoff2.svg?style=flat)](https://www.npmjs.org/package/wawoff2)

Google's [woff2](https://github.com/google/woff2) build for `node.js`, using
WebAssembly. Why this is better than binary bindings:

- works everywhere without rebuild


Install
-------

```sh
npm install wawoff2
```


Use Example
-----------

```js
const require('wawoff2');

// src - Buffer or Uint8Array
wawoff.compress(src).then(out => {
  // store result
});
```

Command-line Example
--------------------

To compress a `.ttf` file into a `.woff2` file:

```bash
woff2_compress.js [-h] [-v] infile [outfile]

Positional arguments:
  infile         Input .ttf file
  outfile        Output .woff2 file (- for stdout)

Optional arguments:
  -h, --help     Show this help message and exit.
  -v, --version  Show program's version number and exit.
```

And the opposite, to decompress a `.woff2` file into a `.ttf` one:

```bash
woff2_decompress.js [-h] [-v] infile [outfile]

Positional arguments:
  infile         Input .woff2 file
  outfile        Output .ttf file (- for stdout)

Optional arguments:
  -h, --help     Show this help message and exit.
  -v, --version  Show program's version number and exit.
```


Development
-----------

[Build emscripten]https://kripken.github.io/emscripten-site/docs/building_from_source/building_emscripten_from_source_using_the_sdk.html) latest sources. Pre-built versions
generated bad code for some reasons.

- download emsdk and unpack to `~/emsdk-portable` folder
- build latest version

```sh
cd ~/emsdk-portable
./emsdk update
./emsdk install sdk-incoming-64bit
./emsdk activate sdk-incoming-64bit
```

- Clone repo, update deps and rebuild if needed

```
git clone --recursive <path_to_repo>
cd wawoff2
source emsdk_env.sh
make clean all
```
