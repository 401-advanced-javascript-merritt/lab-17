'use strict';

const net = require('net');
const client = new net.Socket();

client.connect(3333, 'localhost', () => {});
/**
 * When the event 'error' is heard, log that there was an error.
 * @param  {} 'error'
 * @param  {} (payload
 * @param  {} =>{console.log('Therewasanerror
 * @param  {} payload
 * @param  {} ;}
 */
client.on('error', (payload) => {
  console.log('There was an error:', payload);
});

/**
 * When the success event is heard, log that it was saved.
 * @param  {} 'success'
 * @param  {} (payload
 * @param  {} =>{console.log('savedthefile.'
 * @param  {} payload
 * @param  {} ;}
 */
client.on('success', (payload) => {
  console.log('saved the file.', payload);
});

/**
 * When a socket leaves the server, print that the connection was closed.
 * @param  {} 'close'
 * @param  {} (
 * @param  {} =>{console.log('Connectionclosed'
 * @param  {} ;}
 */
client.on('close', () => {
  console.log('Connection closed');
});
