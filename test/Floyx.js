const { expect } = require("chai");
const bytes32 = require('bytes32');
const { ethers } = require('hardhat');

// Floyx Token testing
describe("Floyx Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Floyx");

    const hardhatToken = await Token.deploy("floyx","flx",100000000000000);

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    console.log(ownerBalance);

    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});

