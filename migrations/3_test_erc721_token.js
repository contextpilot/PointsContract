var TestErc721Token = artifacts.require("TestErc721Token");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(TestErc721Token);
};