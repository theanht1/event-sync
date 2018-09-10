# Ethereum event synchronization in Nodejs server

### Requirements and Running
* Require: Nodejs, yarn/npm, truffle, ganache

* Run:
```
# Start ganache
ganache-cli -d

# Copy ganache account mnemonic to `secrets.json` file
echo `{
  "mnemonic": "{MNEMONIC}"
} > secrets.json

# Install packages
yarn

# Start server
node server.js
```

### Testing
```
node

const { emitEvent1, emitEvent2, emitBoth } = require('./utils')
emitEvent1(2)
emitEvent2(3)
emitBoth()
```
Logs will be showed in server terminal
