'use strict';

const assert = require('assert');

const utils = require('../bin/utils');

describe('swap_ext', function () {
  const { swap_ext } = utils;

  it('swaps .ttf suffix with .woff2', () => {
    assert.equal(swap_ext('font.ttf', '.ttf', '.woff2'), 'font.woff2');
  });

  it('suffixes with .woff2', () => {
    assert.equal(swap_ext('font', '.ttf', '.woff2'), 'font.woff2');
  });

  it('suffixes with .woff2 anyway', () => {
    assert.equal(swap_ext('font.otf', '.ttf', '.woff2'), 'font.otf.woff2');
  });
});
