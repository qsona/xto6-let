'use strict';

const fs = require('fs');
const program = require('commander');

const transformer = require('./lib/let');

program
.usage('[options] <file...>')
.option('--overwrite', 'overwrite spcified files with transformed result')
.parse(process.argv);


const filenames = program.args;
const data = [];
filenames.forEach((filename) => {
  let raw;
  try {
    raw = fs.readFileSync(filename, 'utf-8');
  } catch (e) {
    if (e.code === 'EISDIR') return;
    throw e;
  }
  let transformed = transformer(raw);
  if (!transformed.endsWith('\n')) {
    transformed += '\n';
  }
  data.push({
    filename: filename,
    raw: raw,
    transformed: transformed
  });
});

data.forEach((d) => {
  const filename = program.overwrite ? d.filename : `${d.filename}.out`;
  fs.writeFileSync(filename, d.transformed, 'utf-8');
});
