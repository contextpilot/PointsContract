const TokenPreSale = artifacts.require("TokenPreSale");
const TestErc721Token = artifacts.require("TestErc721Token");

module.exports = async function (deployer, network, accounts) {
  // First deploy the TestERC721Token contract
  const testErc721Token = await TestErc721Token.deployed();
  const tokenPreSaleInstance = await TokenPreSale.deployed();
  console.log('TestErc721Token deployed at', testErc721Token.address);
  console.log('TokenPreSale deployed at', tokenPreSaleInstance.address);

  // Setting up the presale for your TestErc721Token (Modify the variables as necessary)
  const startTime = Math.floor(Date.now() / 1000) + 300; // Start 5 minutes from now
  const endTime = startTime + 86400 * 30; // 30 days
  const pricePerToken = web3.utils.toWei("0.001", "ether"); // Price of each token in ETH
  const tokensToSell = 1000; // Number of tokens to sell
  const baseDecimals = web3.utils.toWei("0", "ether"); // 0 decimal places
  const vestingStartTime = startTime; // Vesting to start immediately after sale ends
  const vestingCliff = 86400; // 1 day cliff
  const vestingPeriod = 86400 * 60; // 60 days vesting period
  const enableBuyWithEth = 1; // Enable buying with ETH
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

  // Update the sale token address of the presale to be the address of the TestErc721Token
  const presaleId = await tokenPreSaleInstance.presaleId();
  await tokenPreSaleInstance.changeSaleTokenAddress(presaleId.toNumber(), testErc721Token.address);

  console.log('TestErc721Token deployed at', testErc721Token.address);
  console.log('TokenPreSale deployed at', tokenPreSaleInstance.address);
};