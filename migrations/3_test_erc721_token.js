var PilotNFT = artifacts.require("PilotNFT");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(PilotNFT);
};