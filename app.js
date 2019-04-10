'use strict';

require('./src/tcp/logger.js');
let alterFile = require('./src/alterFile.js');

let file = process.argv.slice(2).shift();
alterFile.alterFile(file);
