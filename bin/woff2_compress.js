#! /usr/bin/env node

'use strict';

const fs       = require('fs');
const argparse = require('argparse');

const compress = require('../compress');

////////////////////////////////////////////////////////////////////////////////

var parser = new argparse.ArgumentParser({
  prog:     'woff2_compress.js',
  version:  require('../package.json').version,
  addHelp:  true
});

parser.addArgument([ 'infile' ],  { nargs: 1, help: 'Input file' });
parser.addArgument([ 'outfile' ], { nargs: 1, help: 'Output file' });

////////////////////////////////////////////////////////////////////////////////

let args = parser.parseArgs();
let input;

try {
  input = fs.readFileSync(args.infile[0]);
} catch (e) {
  console.error(`Can't open input file (${args.infile[0]})`);
  process.exit(1);
}

compress(input).then(woff2 => {
  fs.writeFileSync(args.outfile[0], woff2);
}, error => {
  console.log(error);
});
