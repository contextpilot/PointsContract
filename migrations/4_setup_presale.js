const TokenPreSale = artifacts.require("TokenPreSale");
const PilotNFT = artifacts.require("PilotNFT");
const state = require('../migrations/migrationState');

module.exports = async function (deployer, network, accounts) {
  // Skip setup if in 'upgrade' mode
  if (state.getMode() === 'upgrade') {
    console.log('Upgrade mode detected, skipping presale setup');
    return;
  }

  // Deploy the pilotNFT contract
  const pilotNFTInstance = await PilotNFT.deployed();
  const tokenPreSaleInstance = await TokenPreSale.deployed();

  console.log('pilotNFT deployed at', pilotNFTInstance.address);
  console.log('TokenPreSale deployed at', tokenPreSaleInstance.address);

  // Setting up the presale for your pilotNFT (Modify the variables as necessary)
  const startTime = Math.floor(Date.now() / 1000) + 300; // Start 5 minutes from now
  const endTime = startTime + 86400 * 6000; // 600 days
  const pricePerToken = web3.utils.toWei("1000000000000", "ether"); // Price of each token in ETH
  const tokensToSell = 10000000; // Number of tokens to sell
  const baseDecimals = web3.utils.toWei("0", "ether"); // 0 decimal places
  const vestingStartTime = startTime; // Vesting to start immediately after sale ends
  const vestingCliff = 86400; // 1 day cliff
  const vestingPeriod = 86400 * 60; // 60 days vesting period
  const enableBuyWithEth = 0; // Enable buying with ETH
  const enableBuyWithUsdt = 1; // Enable buying with USDT

  // Create the presale
  await tokenPreSaleInstance.createPresale(
    startTime,
    endTime,
    pricePerToken,
    tokensToSell,
    baseDecimals,
    vestingStartTime,
    vestingCliff,
    vestingPeriod,
    enableBuyWithEth,
    enableBuyWithUsdt
  );

  // Update the sale token address of the presale to be the address of the pilotNFT
  const presaleId = await tokenPreSaleInstance.presaleId();
  await tokenPreSaleInstance.changeSaleTokenAddress(presaleId.toNumber(), pilotNFTInstance.address);

  console.log('pilotNFT deployed at', pilotNFTInstance.address);
  console.log('TokenPreSale deployed at', tokenPreSaleInstance.address);
};