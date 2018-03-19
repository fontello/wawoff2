#! /usr/bin/env node

/* eslint-disable no-console */

'use strict';

const fs       = require('fs');
const argparse = require('argparse');

const compress = require('../compress');
const { swap_ext } = require('./utils');

////////////////////////////////////////////////////////////////////////////////

var parser = new argparse.ArgumentParser({
  prog:     'woff2_compress.js',
  version:  require('../package.json').version,
  addHelp:  true
});

parser.addArgument([ 'infile' ],  { nargs: 1, help: 'Input .ttf file' });
parser.addArgument([ 'outfile' ], { nargs: '?', help: 'Output .woff2 file (- for stdout)' });

////////////////////////////////////////////////////////////////////////////////

let args = parser.parseArgs();
let infile = args.infile[0];
let outfile = args.outfile;
let input;

try {
  input = fs.readFileSync(infile);
} catch (e) {
  console.error(`Can't open input file (${infile})`);
  process.exit(1);
}

compress(input).then(woff2 => {
  if (outfile === '-') {
    // convert UInt8Array into a disk writeable buffer
    process.stdout.write(Buffer.from(woff2));
  } else {
    if (!outfile) {
      outfile = swap_ext(infile, '.ttf', '.woff2');
    }

    fs.writeFileSync(outfile, woff2);
  }
}, error => {
  console.log(error);
});
