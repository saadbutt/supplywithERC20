const { expect } = require("chai");
const bytes32 = require('bytes32');
const { ethers } = require('hardhat');

// Dividend Token test
describe("Dividend contract", function(){
  
    it("User Claim Divident", async function () {
      const [owner,addr1,addr2,addr3,addr4,addr5,addr6,addr7,addr8] = await ethers.getSigners();
      // Floyx Token Deployment
      const Token = await ethers.getContractFactory("Floyx");
      const hardhatToken = await Token.deploy("floyx","flx",'45000000000000000');
      // Roles
      const keccak256 = require('keccak256');
      const teamaddr = keccak256('TEAM_ROLE');
      const advisoraddr = keccak256('ADVISOR_ROLE');
      const marketingRole = keccak256('MARKETING_ROLE');
      const liquidityRole = keccak256('LIQUIDITY_ROLE');
      const developmentRole = keccak256('DEVELOPMENT_ROLE');
      const ecosystemRole = keccak256('ECOSYSTEM_ROLE');
      const airdropRole = keccak256('AIRDROP_ROLE');
      const grantsRole = keccak256('GRANTS_ROLE');
      // Tokenomics Deployment
      const FloyxTokenomics = await ethers.getContractFactory("FloyxTokenomics");
      const hardhatFloyxTokenomics = await FloyxTokenomics.deploy();
      hardhatFloyxTokenomics.init(hardhatToken.address,
                                      [teamaddr,advisoraddr,marketingRole,liquidityRole,developmentRole,ecosystemRole,airdropRole,grantsRole],
                                      [addr1.address,addr2.address,addr3.address,addr4.address,addr5.address,addr6.address,addr7.address,addr8.address],
                                      [10,5,8,8,10,20,30,3,6],
                                      [10,10,5,1,5,5,1,2,5]);
  
      const transfer = await hardhatToken.transfer(hardhatFloyxTokenomics.address,'40500000000000000')
      // forward time to seven days
      const twentyMonths = 60 * 60 * 24 * 30 * 20 ;
      await ethers.provider.send('evm_increaseTime', [twentyMonths]);
      // await expect(
      await hardhatFloyxTokenomics.connect(addr1).teamClaim();
      // ).to.be.revertedWith("Not enough tokens"); 
      const divident = await ethers.getContractFactory("Dividend");
      const hardhatDivident = await divident.deploy(hardhatToken.address, hardhatFloyxTokenomics.address);
      await hardhatToken.transfer(hardhatDivident.address,'4500000000000000')
  
      const circulatingsupply = await hardhatDivident.CiculatingSupply();
      // consoles
      console.log("total supply",await hardhatToken.totalSupply()/100000000000000);
      console.log("before balance",await hardhatToken.balanceOf(addr1.address)/100000000000000);
      console.log("Divident address balance:", await hardhatToken.balanceOf(hardhatDivident.address)/100000000000000);
      console.log("Tokenomics address balance:", await hardhatToken.balanceOf(hardhatFloyxTokenomics.address)/100000000000000);
      console.log("circulatingsupply",circulatingsupply/100000000000000);
      console.log("divident contract balance before:",await hardhatToken.balanceOf(hardhatDivident.address)/100000000000000)

      const resultt = await hardhatDivident.connect(addr1).ClaimDivident();
      
      // console.log("result reward:", resultt)
      console.log("divident contract balance:",await hardhatToken.balanceOf(hardhatDivident.address)/100000000000000)
      console.log("contract balance",await hardhatDivident.contractBalance()/100000000000000);
      console.log("user balance",await hardhatDivident.userBalance()/100000000000000);
      console.log("user Percentage",await hardhatDivident.userPercentage());
      console.log("rewardAmountDistributed",await hardhatDivident.rewardAmountDistributed()/100000000000000);
      console.log("final balance",await hardhatToken.balanceOf(addr1.address)/100000000000000);
    });

    // it("User Claim Divident Negative case", async function () {
      
    //   const [owner,addr1,addr2,addr3,addr4,addr5,addr6,addr7,addr8] = await ethers.getSigners();
  
    //   // Floyx Token Deployment
    //   const Token = await ethers.getContractFactory("Floyx");
    //   const hardhatToken = await Token.deploy("floyx","flx",'45000000000000000');
  
    //   const keccak256 = require('keccak256');
    //   const teamaddr = keccak256('TEAM_ROLE');
    //   const advisoraddr = keccak256('ADVISOR_ROLE');
    //   const marketingRole = keccak256('MARKETING_ROLE');
    //   const liquidityRole = keccak256('LIQUIDITY_ROLE');
    //   const developmentRole = keccak256('DEVELOPMENT_ROLE');
    //   const ecosystemRole = keccak256('ECOSYSTEM_ROLE');
    //   const airdropRole = keccak256('AIRDROP_ROLE');
    //   const grantsRole = keccak256('GRANTS_ROLE');
    //   console.log([teamaddr.toString('hex'),advisoraddr.toString('hex'),marketingRole.toString('hex'),liquidityRole.toString('hex'),
    //   developmentRole.toString('hex'),ecosystemRole.toString('hex'),airdropRole.toString('hex'),grantsRole.toString('hex')])
    //   // Tokenomics Deployment
    //   const FloyxTokenomics = await ethers.getContractFactory("FloyxTokenomics");
    //   const hardhatFloyxTokenomics = await FloyxTokenomics.deploy(hardhatToken.address,
    //                                   [teamaddr,advisoraddr,marketingRole,liquidityRole,developmentRole,ecosystemRole,airdropRole,grantsRole],
    //                                   [addr1.address,addr2.address,addr3.address,addr4.address,addr5.address,addr6.address,addr7.address,addr8.address],
    //                                   [10,5,8,8,10,20,30,3,6],
    //                                   [10,10,5,1,5,5,1,2,5]);
  
    //   const transfer = await hardhatToken.transfer(hardhatFloyxTokenomics.address,'40500000000000000')
    
    //   // forward time to seven days
    //   const sevenDays = 7 * 24 * 60 * 60;
    //   await ethers.provider.send('evm_increaseTime', [sevenDays]);
  
    //   // await expect(
    //   const fts = await hardhatFloyxTokenomics.connect(addr1).teamClaim();
    //   // ).to.be.revertedWith("Not enough tokens");
  
    //   const divident = await ethers.getContractFactory("Dividend");
    //   const hardhatDivident = await divident.deploy(hardhatToken.address, hardhatFloyxTokenomics.address);
    //   await hardhatToken.transfer(hardhatDivident.address,'4500000000000000')
  
    //   const circulatingsupply = await hardhatDivident.CiculatingSupply();
  
    //   // consoles
    //   console.log("total supply",await hardhatToken.totalSupply()/100000000000000);
    //   console.log("before balance",await hardhatToken.balanceOf(addr1.address)/100000000000000);
    //   console.log("Divident address balance:", await hardhatToken.balanceOf(hardhatDivident.address)/100000000000000);
    //   console.log("Tokenomics address balance:", await hardhatToken.balanceOf(hardhatFloyxTokenomics.address)/100000000000000);
    //   console.log("circulatingsupply",circulatingsupply/100000000000000);

    //   const resultt = await hardhatDivident.connect(addr1).ClaimDivident();
  
    //   console.log("contract balance",await hardhatDivident.contractBalance()/100000000000000);
    //   console.log("user balance",await hardhatDivident.userBalance()/100000000000000);
    //   console.log("user Percentage",await hardhatDivident.userPercentage());
    //   console.log("rewardAmountDistributed",await hardhatDivident.rewardAmountDistributed()/100000000000000);
    //   console.log("final balance",await hardhatToken.balanceOf(addr1.address)/100000000000000);
  
  
    // });
  
  });
  
