'use strict';

let em_module = require('./build/woff2/decompress_binding.js');

let runtimeInit = new Promise(resolve => {
  em_module['onRuntimeInitialized'] = resolve;
});

module.exports = async function decompress(src) {
  await runtimeInit;

  let inputSize = src.length;
  let inputPtr = em_module._malloc(inputSize);
  let input = em_module.HEAPU8.subarray(inputPtr, inputPtr + inputSize);

  input.set(src);

  let decompressed_size_wrap = em_module.cwrap('decompressed_size', 'number', [ 'number' ], [ 'number' ]);
  let outputSize = decompressed_size_wrap(inputPtr, inputSize);
  let outputPtr = em_module._malloc(outputSize);

  let decompress_wrap = em_module.cwrap('decompress', 'number', [ 'number' ], [ 'number' ], [ 'number' ]);

  if (decompress_wrap(inputPtr, inputSize, outputPtr) === -1) {
    throw new Error('ConvertWOFF2ToTTF failed');
  }

  let result = em_module.HEAPU8.slice(outputPtr, outputPtr + outputSize);

  em_module._free(inputPtr);
  em_module._free(outputPtr);

  return result;
};
