'use strict';

let em_module = require('./build/woff2/compress_binding.js');

let runtimeInit = new Promise(resolve => {
  em_module['onRuntimeInitialized'] = resolve;
});

module.exports = async function compress(src) {
  await runtimeInit;

  let inputSize = src.length;
  let inputPtr = em_module._malloc(inputSize);
  let input = em_module.HEAPU8.subarray(inputPtr, inputPtr + inputSize);

  input.set(src);

  let compressed_size_wrap = em_module.cwrap('compressed_size', 'number', [ 'number' ], [ 'number' ]);
  let outputSize = compressed_size_wrap(inputPtr, inputSize);
  let outputPtr = em_module._malloc(outputSize);

  let compress_wrap = em_module.cwrap('compress', 'number', [ 'number' ], [ 'number' ], [ 'number' ]);

  outputSize = compress_wrap(inputPtr, inputSize, outputPtr);

  if (outputSize === -1) {
    throw new Error('ConvertTTFToWOFF2 failed');
  }

  let result = em_module.HEAPU8.slice(outputPtr, outputPtr + outputSize);

  em_module._free(inputPtr);
  em_module._free(outputPtr);

  return result;
};
