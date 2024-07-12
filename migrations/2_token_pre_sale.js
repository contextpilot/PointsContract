const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const TokenPreSale = artifacts.require("TokenPreSale");
var TestUSDT = artifacts.require("TestUSDT");

module.exports = async function (deployer) {
  // BSC Testnet
  // Bsc Testnet BNB / USD Oracle: 0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526 -> https://docs.chain.link/docs/data-feeds/price-feeds/addresses/
  // TestUSDT BscTestNet (created with TestUSDT contract) = 0x250df3426Facabb1a1AE0145ea2E86cdbb296fA7
  // 
  // Goerli ETH Testnet
  // Goerli ETH/USDT Oracle: 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e -> https://docs.chain.link/docs/data-feeds/price-feeds/addresses/
  // TestUSDT Goerli (created with TestUSDT contract) = 0x2BDc3A5CC1DFB531d6eB77812D08bD8C7201c683
  //
  // BSC MainNet
  // Bsc Mainnet BNB / USD Oracle: 0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE -> https://docs.chain.link/docs/data-feeds/price-feeds/addresses/
  // USDT Mainnet 0x55d398326f99059fF775485246999027B3197955
  // 

  //const testUSDT = await TestUSDT.deployed();
  //console.log("test usdt", testUSDT.address)
  const instance = await deployProxy(TokenPreSale, ['0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE', '0x55d398326f99059fF775485246999027B3197955'], { deployer });
  console.log('Deployed', instance.address);
};
