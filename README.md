woff2 for node.js (via WebAssembly)
===================================

That's an experiment of porting Google's [woff2](https://github.com/google/woff2)
to node.js, using WebAssembly. Why this is better than binary bindings:

- no need to compile on install
- works everywhere


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

From command line:

```sh
./bin/woff2_compress.js <src.ttf> <out.woff2>
./bin/woff2_decompress.js <src.woff2> <out.ttf>
```


Build
-----

[Install emscripten](https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html).


```
git clone --recursive <path_to_repo>
cd wawoff2
source emsdk_env.sh
make clean all
```

References
----------

https://github.com/google/woff2
