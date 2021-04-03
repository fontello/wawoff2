'use strict'

const em_module = require('./build/compress_binding.js')

const runtimeInit = new Promise(resolve => {
  em_module.onRuntimeInitialized = resolve
})

module.exports = async function compress (buffer) {
  await runtimeInit
  const result = em_module.compress(buffer)
  if (result === false) throw new Error('ConvertTTFToWOFF2 failed')
  return result
}
