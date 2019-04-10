const fs = require('fs');
const util = require('util');
let readFile = util.promisify(fs.readFile);
let writeFile = util.promisify(fs.writeFile);
require('./tcp/logger.js');

const net = require('net');
const client = new net.Socket();
client.connect(3333, 'localhost', () => {});


let readIn = (file) => {
  return readFile(file);
};

let writeOut = (file, buffer) => {
  return writeFile(file, buffer);
};

let editBuffer = (buffer)=> {
  return Buffer.from(buffer.toString().trim().toUpperCase());
};

let alterFile = (file) => {
  readIn(file)
    .then(buffer => {
      buffer = editBuffer(buffer);
      writeOut(file, buffer)
        .then(client.write('success', 'file written ok'));
    })
    .catch(error => client.write('error', error));
};

module.exports = {alterFile};