'use strict';

const { extname } = require('path');

exports.swap_ext = (filename, from_ext, to_ext) => {
  const ext = extname(filename);

  // if filename has an extension, swap it
  if (ext === from_ext) {
    return filename.replace(new RegExp(from_ext + '$', 'i'), to_ext);
  }

  // otherwise force suffix
  return filename + to_ext;
};
