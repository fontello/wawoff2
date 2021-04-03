'use strict'

const em_module = require('./build/decompress_binding.js')

const runtimeInit = new Promise(resolve => {
  em_module.onRuntimeInitialized = resolve
})

module.exports = async function decompress (buffer) {
  await runtimeInit
  const result = em_module.decompress(buffer)
  if (result === false) throw new Error('ConvertWOFF2ToTTF failed')
  return result
}
