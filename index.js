const EventEmitter = require("events") ;
const LogEvents = require('./LogEvents');
const eventEmitter = new EventEmitter();
eventEmitter.on('log', (msg) => LogEvents(msg))
 
 
setTimeout(() => {
       
    eventEmitter.emit('log', 'Data was added');
  }, 1000);
 