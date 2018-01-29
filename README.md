woff2 for node.js (via WebAssembly)
===================================

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
