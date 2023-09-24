import initSequelize from './models/index.js';
import configureWebService from './utils/configureWebService.js';
import example from './example.js';

await initSequelize();
await example();
configureWebService();
