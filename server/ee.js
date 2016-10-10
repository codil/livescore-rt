const EventEmitter = require('events');
class LiveScoreEventsEmitter extends EventEmitter {}
const ee = new LiveScoreEventsEmitter();
ee.setMaxListeners(0);
module.exports = ee;