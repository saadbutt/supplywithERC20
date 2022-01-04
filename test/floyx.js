const { expect } = require("chai");
const bytes32 = require('bytes32');

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

describe("Tokenomics contract", function(){
  it("Deployment file", async function () {
    
    const [owner,addr1,addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Floyx");

    const hardhatToken = await Token.deploy("floyx","flx",100000000000000);
    console.log(hardhatToken.address)
    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    const FloyxTokenomics = await ethers.getContractFactory("FloyxTokenomics");
    console.log(ownerBalance,"123");
    const teamaddr = bytes32({ input: 'TEAM_ROLE' });
    const advisoraddr = bytes32({ input: 'ADVISOR_ROLE' });

    //console.log([teamaddr,teamaddr]);
     // ,[addr1,addr2],[10,5],[10,10]);
    const hardhatFloyxTokenomics = await FloyxTokenomics.deploy(hardhatToken.address,
    [teamaddr,advisoraddr],[addr1.address,addr2.address],[10,5],[10,10]);
   // console.log(hardhatFloyxTokenomics);
    const resp = await hardhatFloyxTokenomics.roles(teamaddr);

    await expect(
      hardhatFloyxTokenomics.connect(addr1).teamClaim()
    ).to.be.revertedWith("Not enough tokens");
    console.log([addr1.address,addr2.address],"start")
    console.log(resp,"end");

  });

});
