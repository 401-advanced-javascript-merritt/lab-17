'use strict';

const net = require('net');

const port = 3333;
const server = net.createServer();

server.listen(port, ()=> console.log('server up on ', port));

let socketPool = {};
let allowedEvents = ['error', 'success'];

/**
 * When a socket connects to the server, give them an id and print it.
 * @param  {} 'connection'
 * @param  {} (socket
 * @param  {} =>{constid=`Socket-${Math.random(
 * @param  {} }`;socketPool[id]=socket;console.log(`Welcome`
 * @param  {} id
 * @param  {} ;socket.on('close'
 * @param  {} (
 * @param  {} =>{deletesocketPool[id];console.log(`Goodbye${id}`
 * @param  {} ;}
 * @param  {} ;socket.on('data'
 * @param  {} handleData
 * @param  {} ;}
 */
server.on('connection', (socket) => {

  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;
  console.log(`Welcome `, id);

  socket.on('close', () => {
    delete socketPool[id];
    console.log(`Goodbye ${id}`);
  });

  socket.on('data', handleData);

});

/**
 * Write to the console if an allowed event is recieved.
 * @param  {} buffer
 * @param  {} =>{lettext=buffer.toString(
 * @param  {} .trim(
 * @param  {} ;let[event
 * @param  {} payload]=text.split(/\s+(.*
 * @param  {} /
 * @param  {} ;if(allowedEvents.includes(event
 * @param  {} {console.log(`BROADCAST
 */
const handleData = (buffer) => {
  let text = buffer.toString().trim();
  let [event, payload] = text.split(/\s+(.*)/);

  if(allowedEvents.includes(event)) {
    console.log(`BROADCAST: ${event}`);
    for(let socket in socketPool) {
      socketPool[socket].write(`${event}: ${payload}\n`);
    }
  }
  else {
    console.log(`Ignore: ${event}`);
  }

  console.log('Event:', event, 'Payload:', payload);
};
