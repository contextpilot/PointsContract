const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const TokenPreSale = artifacts.require('TokenPreSale');
const state = require('../migrations/migrationState');

module.exports = async function (deployer) {
    if (state.getMode() === 'upgrade') {
        const existing = await TokenPreSale.deployed();
        const upgraded = await upgradeProxy(existing.address, TokenPreSale, { deployer });
        console.log('TokenPreSale upgraded to', upgraded.address);
    }
};