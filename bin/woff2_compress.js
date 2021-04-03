#! /usr/bin/env node

/* eslint-disable no-console */

'use strict'

const fs       = require('fs')
const argparse = require('argparse')

const compress = require('../compress')
const { swap_ext } = require('./utils')


const parser = new argparse.ArgumentParser({
  prog:     'woff2_compress.js',
  add_help:  true
})

parser.add_argument('-v', '--version', {
  action: 'version',
  version: require('../package.json').version
})

parser.add_argument('infile',  {
  nargs: 1,
  help: 'Input .ttf file'
})

parser.add_argument('outfile', {
  nargs: '?',
  help: 'Output .woff2 file (- for stdout)'
})


const args = parser.parse_args()
const infile = args.infile[0]
let outfile = args.outfile
let input

try {
  input = fs.readFileSync(infile)
} catch (e) {
  console.error(`Can't open input file (${infile})`)
  process.exit(1)
}

compress(input).then(woff2 => {
  if (outfile === '-') {
    // convert UInt8Array into a disk writeable buffer
    process.stdout.write(Buffer.from(woff2))
  } else {
    if (!outfile) {
      outfile = swap_ext(infile, '.ttf', '.woff2')
    }

    fs.writeFileSync(outfile, woff2)
  }
}, error => {
  console.log(error)
})
