const Migrations = artifacts.require("Counter");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
