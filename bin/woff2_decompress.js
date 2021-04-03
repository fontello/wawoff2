#! /usr/bin/env node

/* eslint-disable no-console */

'use strict'

const fs       = require('fs')
const argparse = require('argparse')

const decompress = require('../decompress')
const { swap_ext } = require('./utils')


const parser = new argparse.ArgumentParser({
  prog:     'woff2_decompress.js',
  add_help:  true
})

parser.add_argument('-v', '--version', {
  action: 'version',
  version: require('../package.json').version
})

parser.add_argument('infile',  {
  nargs: 1,
  help: 'Input .woff2 file'
})

parser.add_argument('outfile', {
  nargs: '?',
  help: 'Output .ttf file (- for stdout)'
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

decompress(input).then(ttf => {
  if (outfile === '-') {
    // convert UInt8Array into a disk writeable buffer
    process.stdout.write(Buffer.from(ttf))
  } else {
    if (!outfile) {
      outfile = swap_ext(infile, '.woff2', '.ttf')
    }

    fs.writeFileSync(outfile, ttf)
  }
}, error => {
  console.log(error)
})
