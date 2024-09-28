const PilotNFT = artifacts.require("PilotNFT");
const state = require('../migrations/migrationState');

module.exports = async function(deployer) {
  // Skip deployment if in 'upgrade' mode
  if (state.getMode() === 'upgrade') {
    console.log('Upgrade mode detected, skipping PilotNFT deployment');
    return;
  }

  await deployer.deploy(PilotNFT);
  console.log('PilotNFT deployed');
};