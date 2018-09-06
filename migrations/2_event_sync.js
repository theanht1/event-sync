var EventSync = artifacts.require("./EventSync.sol");

module.exports = function(deployer) {
  deployer.deploy(EventSync);
};
