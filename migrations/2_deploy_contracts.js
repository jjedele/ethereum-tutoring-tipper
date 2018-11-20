var TUMOracleContract = artifacts.require("./TUMOracle.sol");

module.exports = function(deployer) {
  deployer.deploy(TUMOracleContract);
};
