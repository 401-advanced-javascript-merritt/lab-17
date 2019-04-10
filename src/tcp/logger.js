'use strict';

const net = require('net');
const client = new net.Socket();

client.connect(3333, 'localhost', () => {});

client.on('error', (payload) => {
  console.log('There was an error:', payload);
});

client.on('success', (payload) => {
  console.log('saved the file.', payload);
});

client.on('close', () => {
  console.log('Connection closed');
});
