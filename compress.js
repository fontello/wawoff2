'use strict';

let em_module = require('./build/compress_binding.js');

let runtimeInit = new Promise(resolve => {
  em_module['onRuntimeInitialized'] = resolve;
});

module.exports = async function compress(buffer) {
  await runtimeInit;
  let result = em_module.compress(buffer);
  if (result === false) throw new Error('ConvertTTFToWOFF2 failed');
  return result;
};
