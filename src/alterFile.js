const fs = require('fs');
const util = require('util');
let readFile = util.promisify(fs.readFile);
let writeFile = util.promisify(fs.writeFile);
require('./tcp/logger.js');

const net = require('net');
const client = new net.Socket();
client.connect(3333, 'localhost', () => {});

/**
 * Read in a file then return a promise
 * @param  {} file
 * @param  {} =>{returnreadFile(file
 */
let readIn = (file) => {
  return readFile(file);
};

/**
 * Write to a file then return a promise.
 * @param  {} file
 * @param  {} buffer
 * @param  {} =>{returnwriteFile(file
 * @param  {} buffer
 */
let writeOut = (file, buffer) => {
  return writeFile(file, buffer);
};

/**
 * Change the text within a buffer to uppercase.
 * @param  {} buffer
 * @param  {} =>{returnBuffer.from(buffer.toString(
 * @param  {} .trim(
 * @param  {} .toUpperCase(
 */
let editBuffer = (buffer)=> {
  return Buffer.from(buffer.toString().trim().toUpperCase());
};

/**
 * A wrapper for the promise functions that writes to the client.
 * @param  {} file
 * @param  {} =>{readIn(file
 * @param  {} .then(buffer=>{buffer=editBuffer(buffer
 * @param  {} ;writeOut(file
 * @param  {} buffer
 * @param  {} .then(client.write('success'
 * @param  {} 'filewrittenok'
 * @param  {} ;}
 * @param  {} .catch(error=>client.write('error'
 * @param  {} error
 */
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