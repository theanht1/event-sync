const express = require('express');
const { EventSync } = require('./utils');

// App define
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(3737, () => {
  console.log('Server start at port 3000');
});

// Event listeners
const handleEvent = (event) => {
  const timeout = Math.floor(Math.random() * 1000 + 1000);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(event.event, ', id: ', event.args.id.toNumber(), ', elapsed: ', timeout);
      resolve();
    }, timeout);
  });
}

const eventBuffer = [];
let timer = setTimeout(async function handle() {
  if (eventBuffer.length > 0) {
    await handleEvent(eventBuffer.splice(0, 1)[0]);
  }
  timer = setTimeout(handle, 200);
}, 200);

const addEvent = (event) => {
  eventBuffer.push(event);
};

const setupEventListener = async () => {
  const blockRange = { fromBlock: 0, toBlock: 'latest' };
  const eventInstance = await EventSync.deployed();

  const events = eventInstance.allEvents(blockRange);
  events.watch((err, event) => {
    if (err) {
      console.log(err);
      return;
    }
    addEvent(event);
  });

  //// New event 1
  //const event1 = eventInstance.Event1({}, blockRange);
  //event1.watch((err, result) => {
  //  if (err) {
  //    console.log(err);
  //    return;
  //  }
  //  addEvent(result);
  //});

  //// New event 2
  //const event2 = eventInstance.Event2({}, blockRange);
  //event2.watch((err, result) => {
  //  if (err) {
  //    console.log(err);
  //    return;
  //  }
  //  addEvent(result);
  //});
}

setupEventListener();

