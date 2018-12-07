var TUMOracleContract = artifacts.require("./TUMOracle.sol");
var TipperContract = artifacts.require("./Tipping.sol");

module.exports = function(deployer) {
  deployer.deploy(TUMOracleContract).then(() => {
    //deployer.link(TUMOracleContract, TipperContract);
    deployer.deploy(TipperContract, TUMOracleContract.address, "testcourse", 1);
  });
};
