'use strict';

const assert = require('assert');
const read   = require('fs').readFileSync;
const join   = require('path').join;

const wawoff2 = require('../');


describe('chain', function () {

  const ttf_file   = Uint8Array.from(read(join(__dirname, './fixtures/sample.ttf')));
  const woff2_file = Uint8Array.from(read(join(__dirname, './fixtures/sample.woff2')));

  it('compress', async function () {
    let out = await wawoff2.compress(ttf_file);
    assert.deepEqual(out, woff2_file);
  });

  it('decompress', async function () {
    let out = await wawoff2.decompress(woff2_file);
    assert.deepEqual(out, ttf_file);
  });

});
