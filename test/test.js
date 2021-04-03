'use strict'

const assert = require('assert')
const read   = require('fs').readFileSync
const join   = require('path').join

const wawoff2 = require('../')


describe('chain', function () {

  const sample   = Uint8Array.from(read(join(__dirname, './fixtures/sample.ttf')))
  const sample_compressed = Uint8Array.from(read(join(__dirname, './fixtures/sample_compressed.woff2')))
  const sample_decompressed = Uint8Array.from(read(join(__dirname, './fixtures/sample_decompressed.ttf')))

  it('compress', async function () {
    this.timeout(3000)

    const out = await wawoff2.compress(sample)
    assert.deepEqual(out, sample_compressed)
  })

  it('decompress', async function () {
    const out = await wawoff2.decompress(sample_compressed)
    assert.deepEqual(out, sample_decompressed)
  })

})
