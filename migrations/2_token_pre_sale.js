const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const TokenPreSale = artifacts.require("TokenPreSale");
const state = require('../migrations/migrationState');

module.exports = async function (deployer, network) {
  let oracleAddress; 
  let usdtAddress;

  if (network === 'bscTestnet') {
    // BSC Testnet
    oracleAddress = '0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526';
    usdtAddress = '0x250df3426Facabb1a1AE0145ea2E86cdbb296fA7';
  } else if (network === 'goerli') {
    // Goerli ETH Testnet
    oracleAddress = '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e';
    usdtAddress = '0x2BDc3A5CC1DFB531d6eB77812D08bD8C7201c683';
  } else if (network === 'bsc') {
    // BSC MainNet
    oracleAddress = '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE';
    usdtAddress = '0x55d398326f99059fF775485246999027B3197955';
  } else if (network === 'op') {
    // Op mainnet
    oracleAddress = '0x13e3Ee699D1909E989722E753853AE30b17e08c5';
    usdtAddress = '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58';
  } else if (network === 'opbnb') {
    // OpBNB Mainnet
    oracleAddress = '0x3d1E16C26E00A17e3C243330Cc9Ea031C2394c0a';
    usdtAddress = '0x9e5AAC1Ba1a2e6aEd6b32689DFcF62A509Ca96f3';
  } else {
    throw new Error('Unsupported network');
  }

  try {
    const existingInstance = await TokenPreSale.deployed();
    console.log('TokenPreSale is already deployed at:', existingInstance.address);
    state.setMode('upgrade'); // Set mode to 'upgrade'
  } catch (e) {
    console.log('Deploying a new instance of TokenPreSale');
    const instance = await deployProxy(TokenPreSale, [oracleAddress, usdtAddress], { deployer });
    console.log('Deployed TokenPreSale at:', instance.address);
  }
};