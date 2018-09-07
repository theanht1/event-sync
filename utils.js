const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
//const Web3 = require('web3');
const contract = require('truffle-contract');

const eventSyncArtifact = require('./build/contracts/EventSync.json');


let secrets;
let mnemonic = '';

if (fs.existsSync('secrets.json')) {
  secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf8'));
  ({ mnemonic } = secrets);
}


const provider =  new HDWalletProvider(mnemonic, 'http://localhost:8545');
const account = provider.getAddress();
const EventSync = contract(eventSyncArtifact);
EventSync.setProvider(provider);

const emitEvent1 = async (times = 1) => {
  const instance = await EventSync.deployed();
  await instance.emitEvent1(times, { from: account });
}

const emitEvent2 = async (times = 1) => {
  const instance = await EventSync.deployed();
  await instance.emitEvent2(times, { from: account });
}

const emitBoth = async () => {
  const instance = await EventSync.deployed();
  await instance.emitBoth({ from: account });
}
module.exports = {
  EventSync,
  emitEvent1,
  emitEvent2,
  emitBoth,
};
