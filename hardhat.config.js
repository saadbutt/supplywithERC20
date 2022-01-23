require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const POLYTEST_PRIVATE_KEY = "7cd308f8b5f80233b279079ccf61dfc8ad4b2a7728ed971c2321794621f1f15c";
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/49909763e62f4e1f947ea70b2c343db2`,
      accounts: [`${POLYTEST_PRIVATE_KEY}`]
    },
    polygonTest:{
      url: `https://rpc-mumbai.maticvigil.com/`,
      accounts: [`${POLYTEST_PRIVATE_KEY}`]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "KYKFJ25VEKJCHESFAUNNSH32WFR5MRPSY2"
  }
};
