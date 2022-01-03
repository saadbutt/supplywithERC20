const { expect } = require("chai");

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

// describe("Tokenomics contract", function(){
//   it("Deployment file", async function () {
//     const [owner] = await ethers.getSigners();

//     const Token = await ethers.getContractFactory("FloyxTokenomics");
//     console.log("123");
//     const hardhatToken = await Token.deploy("0xd9145CCE52D386f254917e481eB44e9943F39138",["0x5146a08baf902532d0ee2f909971144f12ca32651cd70cbee1117cddfb3b3b33","0x9c1ca198f61ac1647c38f20b6678649f8e87b7e06309094d812edd1e9119d309"]
//     ,'["0x4d23c8E0e601C5e37b062832427b2D62777fAEF9","0x4d23c8E0e601C5e37b062832427b2D62777fAEF9"]'
//     ,'[10,"5"]','[10,"10"]');
//     console.log("12344");
//     const ownerBalance = await hardhatToken.balanceOf(owner.address);
//     console.log(ownerBalance);

//     expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//   });

// });
