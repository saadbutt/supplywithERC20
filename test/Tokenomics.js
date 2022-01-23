const { expect } = require("chai");
const bytes32 = require('bytes32');
const { ethers } = require('hardhat');


// Tokenomics Token test
describe("Tokenomics contract", function(){
  
  it("Claim all teams Balance", async function () {
    
    const [owner,addr1,addr2,addr3,addr4,addr5,addr6,addr7,addr8,addr9] = await ethers.getSigners();
    const flowtotalBalance = 45000000000000000
    // Floyx Token Deployment
    const Token = await ethers.getContractFactory("Floyx");
    const hardhatToken = await Token.deploy("floyx","flx", flowtotalBalance.toString());


    const keccak256 = require('keccak256');
    const teamaddr = keccak256('TEAM_ROLE');
    const advisoraddr = keccak256('ADVISOR_ROLE');
    const marketingRole = keccak256('MARKETING_ROLE');
    const liquidityRole = keccak256('LIQUIDITY_ROLE');
    const developmentRole = keccak256('DEVELOPMENT_ROLE');
    const ecosystemRole = keccak256('ECOSYSTEM_ROLE');
    const tokensaleRole = keccak256('TOKENSALE_ROLE');
    const airdropRole = keccak256('AIRDROP_ROLE');
    const grantsRole = keccak256('GRANTS_ROLE');

    const teamPercentage = 10;
    const advisorPercentage = 5;
    const marketingPercentage = 8;
    const liquidityPercentage = 8;
    const developmentPercentage = 10;
    const ecosystemPercentage = 20;
    const tokensalePercentage = 30;
    const airdropPercentage = 3;
    const grantPercentage = 6;
    const tokenomicsBalance = 40500000000000000;
    const dividentBalance = 4500000000000000;
    
    // Tokenomics Deployment
    const FloyxTokenomics = await ethers.getContractFactory("FloyxTokenomics");
    const hardhatFloyxTokenomics = await FloyxTokenomics.deploy();
    hardhatFloyxTokenomics.init(hardhatToken.address,
                                  [teamaddr, advisoraddr, marketingRole, liquidityRole, developmentRole, ecosystemRole, tokensaleRole, airdropRole, grantsRole],
                                  [addr1.address, addr2.address, addr3.address, addr4.address, addr5.address, addr6.address, addr7.address, addr8.address, addr9.address],
                                  [teamPercentage, advisorPercentage, marketingPercentage, liquidityPercentage, developmentPercentage, 
                                    ecosystemPercentage, tokensalePercentage, airdropPercentage, grantPercentage],
                                    [10, 10, 5, 1, 5, 5, 1, 2, 5]);
          
    const transfer = await hardhatToken.transfer(hardhatFloyxTokenomics.address, tokenomicsBalance.toString())
                                                                                 
    // forward time to 20 months
    const sevenDays = 60 * 60 * 24 * 30 * 20 ;
    await ethers.provider.send('evm_increaseTime', [sevenDays]);
    await hardhatFloyxTokenomics.connect(addr1).teamClaim();

  
    // All Claim amount shoule be equal to Compare percentage of team                                
    expect(await hardhatToken.balanceOf(addr1.address)/100000000000000).to.equal(await (((flowtotalBalance/100000000000000)/100)*teamPercentage));
    
    // Divident Contract deploy
    const divident = await ethers.getContractFactory("Dividend");
    const hardhatDivident = await divident.deploy(hardhatToken.address, hardhatFloyxTokenomics.address);
    
    await hardhatToken.transfer(hardhatDivident.address,dividentBalance.toString());

    const circulatingsupply = await hardhatDivident.CiculatingSupply();

    // // consoles
    // console.log("total supply", await hardhatToken.totalSupply()/100000000000000);
    // console.log("before balance", await hardhatToken.balanceOf(addr1.address)/100000000000000);
    // console.log("Divident address balance:", await hardhatToken.balanceOf(hardhatDivident.address)/100000000000000);
    // console.log("Tokenomics address balance:", await hardhatToken.balanceOf(hardhatFloyxTokenomics.address)/100000000000000);
    // console.log("circulatingsupply", circulatingsupply/100000000000000);

    // const result = await hardhatDivident.connect(addr1).ClaimDivident();

    // console.log("contract balance",await hardhatDivident.contractBalance()/100000000000000);
    // console.log("user balance",await hardhatDivident.userBalance()/100000000000000);
    // console.log("user Percentage",await hardhatDivident.userPercentage());
    // console.log("rewardAmountDistributed",await hardhatDivident.rewardAmountDistributed()/100000000000000);
    // console.log("final balance",await hardhatToken.balanceOf(addr1.address)/100000000000000);

  });


  it("Claim all Installments of Advisor Role", async function () {
    
    const [owner,addr1,addr2,addr3,addr4,addr5,addr6,addr7,addr8,addr9] = await ethers.getSigners();
    const flowtotalBalance = 45000000000000000
    // Floyx Token Deployment
    const Token = await ethers.getContractFactory("Floyx");
    const hardhatToken = await Token.deploy("floyx","flx", flowtotalBalance.toString());


    const keccak256 = require('keccak256');
    const teamaddr = keccak256('TEAM_ROLE');
    const advisoraddr = keccak256('ADVISOR_ROLE');
    const marketingRole = keccak256('MARKETING_ROLE');
    const liquidityRole = keccak256('LIQUIDITY_ROLE');
    const developmentRole = keccak256('DEVELOPMENT_ROLE');
    const ecosystemRole = keccak256('ECOSYSTEM_ROLE');
    const tokensaleRole = keccak256('TOKENSALE_ROLE');
    const airdropRole = keccak256('AIRDROP_ROLE');
    const grantsRole = keccak256('GRANTS_ROLE');

    const teamPercentage = 10;
    const advisorPercentage = 5;
    const marketingPercentage = 8;
    const liquidityPercentage = 8;
    const developmentPercentage = 10;
    const ecosystemPercentage = 20;
    const tokensalePercentage = 30;
    const airdropPercentage = 3;
    const grantPercentage = 6;
    const tokenomicsBalance = 40500000000000000;
    const dividentBalance = 4500000000000000;
    
    // Tokenomics Deployment
    const FloyxTokenomics = await ethers.getContractFactory("FloyxTokenomics");
    const hardhatFloyxTokenomics = await FloyxTokenomics.deploy();
    hardhatFloyxTokenomics.init(hardhatToken.address,
                                  [teamaddr, advisoraddr, marketingRole, liquidityRole, developmentRole, ecosystemRole, tokensaleRole, airdropRole, grantsRole],
                                  [addr1.address, addr2.address, addr3.address, addr4.address, addr5.address, addr6.address, addr7.address, addr8.address, addr9.address],
                                  [teamPercentage, advisorPercentage, marketingPercentage, liquidityPercentage, developmentPercentage, 
                                    ecosystemPercentage, tokensalePercentage, airdropPercentage, grantPercentage],
                                    [10, 10, 5, 1, 5, 5, 1, 2, 5]);
          
    const transfer = await hardhatToken.transfer(hardhatFloyxTokenomics.address, tokenomicsBalance.toString())
                                                                                 
    // forward time to 20 months
    const sevenDays = 60 * 60 * 24 * 30 * 200 ;
    await ethers.provider.send('evm_increaseTime', [sevenDays]);
    await hardhatFloyxTokenomics.connect(addr2).advisorClaim();

    console.log("advisor", await hardhatToken.balanceOf(addr2.address)/100000000000000);
    console.log("addvisor:", await (((flowtotalBalance/100000000000000)/100)*advisorPercentage));

    // All Claim amount shoule be equal to Compare percentage of team                                
    expect(await hardhatToken.balanceOf(addr2.address)/100000000000000).to.equal(await (((flowtotalBalance/100000000000000)/100)*advisorPercentage));

  });

  it("Claim all Installments of Marketing Role", async function () {
    
    const [owner,addr1,addr2,addr3,addr4,addr5,addr6,addr7,addr8,addr9] = await ethers.getSigners();
    const flowtotalBalance = 45000000000000000
    // Floyx Token Deployment
    const Token = await ethers.getContractFactory("Floyx");
    const hardhatToken = await Token.deploy("floyx","flx", flowtotalBalance.toString());


    const keccak256 = require('keccak256');
    const teamaddr = keccak256('TEAM_ROLE');
    const advisoraddr = keccak256('ADVISOR_ROLE');
    const marketingRole = keccak256('MARKETING_ROLE');
    const liquidityRole = keccak256('LIQUIDITY_ROLE');
    const developmentRole = keccak256('DEVELOPMENT_ROLE');
    const ecosystemRole = keccak256('ECOSYSTEM_ROLE');
    const tokensaleRole = keccak256('TOKENSALE_ROLE');
    const airdropRole = keccak256('AIRDROP_ROLE');
    const grantsRole = keccak256('GRANTS_ROLE');

    const teamPercentage = 10;
    const advisorPercentage = 5;
    const marketingPercentage = 8;
    const liquidityPercentage = 8;
    const developmentPercentage = 10;
    const ecosystemPercentage = 20;
    const tokensalePercentage = 30;
    const airdropPercentage = 3;
    const grantPercentage = 6;
    const tokenomicsBalance = 40500000000000000;
    const dividentBalance = 4500000000000000;
    
    // Tokenomics Deployment
    const FloyxTokenomics = await ethers.getContractFactory("FloyxTokenomics");
    const hardhatFloyxTokenomics = await FloyxTokenomics.deploy();
    hardhatFloyxTokenomics.init(hardhatToken.address,
                                  [teamaddr, advisoraddr, marketingRole, liquidityRole, developmentRole, ecosystemRole, tokensaleRole, airdropRole, grantsRole],
                                  [addr1.address, addr2.address, addr3.address, addr4.address, addr5.address, addr6.address, addr7.address, addr8.address, addr9.address],
                                  [teamPercentage, advisorPercentage, marketingPercentage, liquidityPercentage, developmentPercentage, 
                                    ecosystemPercentage, tokensalePercentage, airdropPercentage, grantPercentage],
                                    [10, 10, 5, 1, 5, 5, 1, 2, 5]);
          
    const transfer = await hardhatToken.transfer(hardhatFloyxTokenomics.address, tokenomicsBalance.toString())
                                                                                 
    // forward time to 20 months
    const sevenDays = 60 * 60 * 24 * 30 * 20 ;
    await ethers.provider.send('evm_increaseTime', [sevenDays]);
    await hardhatFloyxTokenomics.connect(addr3).marketingClaim()

    console.log("marketing:",await hardhatToken.balanceOf(addr3.address)/100000000000000)
    console.log("marketing:::",await (((flowtotalBalance/100000000000000)/100)*marketingPercentage))
    // All Claim amount shoule be equal to Compare percentage of team                                
    expect(await hardhatToken.balanceOf(addr3.address)/100000000000000).to.equal(await (((flowtotalBalance/100000000000000)/100)*marketingPercentage));

  });


  it("Claim all Installments of Liquidity Role", async function () {
    
    const [owner,addr1,addr2,addr3,addr4,addr5,addr6,addr7,addr8,addr9] = await ethers.getSigners();
    const flowtotalBalance = 45000000000000000
    // Floyx Token Deployment
    const Token = await ethers.getContractFactory("Floyx");
    const hardhatToken = await Token.deploy("floyx","flx", flowtotalBalance.toString());


    const keccak256 = require('keccak256');
    const teamaddr = keccak256('TEAM_ROLE');
    const advisoraddr = keccak256('ADVISOR_ROLE');
    const marketingRole = keccak256('MARKETING_ROLE');
    const liquidityRole = keccak256('LIQUIDITY_ROLE');
    const developmentRole = keccak256('DEVELOPMENT_ROLE');
    const ecosystemRole = keccak256('ECOSYSTEM_ROLE');
    const tokensaleRole = keccak256('TOKENSALE_ROLE');
    const airdropRole = keccak256('AIRDROP_ROLE');
    const grantsRole = keccak256('GRANTS_ROLE');

    const teamPercentage = 10;
    const advisorPercentage = 5;
    const marketingPercentage = 8;
    const liquidityPercentage = 8;
    const developmentPercentage = 10;
    const ecosystemPercentage = 20;
    const tokensalePercentage = 30;
    const airdropPercentage = 3;
    const grantPercentage = 6;
    const tokenomicsBalance = 40500000000000000;
    const dividentBalance = 4500000000000000;
    
    // Tokenomics Deployment
    const FloyxTokenomics = await ethers.getContractFactory("FloyxTokenomics");
    const hardhatFloyxTokenomics = await FloyxTokenomics.deploy()
    hardhatFloyxTokenomics.init(hardhatToken.address,
                                  [teamaddr, advisoraddr, marketingRole, liquidityRole, developmentRole, ecosystemRole, tokensaleRole, airdropRole, grantsRole],
                                  [addr1.address, addr2.address, addr3.address, addr4.address, addr5.address, addr6.address, addr7.address, addr8.address, addr9.address],
                                  [teamPercentage, advisorPercentage, marketingPercentage, liquidityPercentage, developmentPercentage, 
                                    ecosystemPercentage, tokensalePercentage, airdropPercentage, grantPercentage],
                                    [10, 10, 5, 1, 5, 5, 1, 2, 5]);
          
    const transfer = await hardhatToken.transfer(hardhatFloyxTokenomics.address, tokenomicsBalance.toString())
                                                                                 
    // forward time to 20 months
    const sevenDays = 60 * 60 * 24 * 30 * 20 ;
    await ethers.provider.send('evm_increaseTime', [sevenDays]);
    await hardhatFloyxTokenomics.connect(addr4).liquidityClaim();

    console.log("liquidity::",await hardhatToken.balanceOf(addr4.address)/100000000000000);
    console.log("liquidit:",await (((flowtotalBalance/100000000000000)/100)*liquidityPercentage));

    // All Claim amount shoule be equal to Compare percentage of team                                
    expect(await hardhatToken.balanceOf(addr4.address)/100000000000000).to.equal(await (((flowtotalBalance/100000000000000)/100)*liquidityPercentage));

  });


  it("Claim all Installments of Development Role", async function () {
    
    const [owner,addr1,addr2,addr3,addr4,addr5,addr6,addr7,addr8,addr9] = await ethers.getSigners();
    const flowtotalBalance = 45000000000000000
    // Floyx Token Deployment
    const Token = await ethers.getContractFactory("Floyx");
    const hardhatToken = await Token.deploy("floyx","flx", flowtotalBalance.toString());


    const keccak256 = require('keccak256');
    const teamaddr = keccak256('TEAM_ROLE');
    const advisoraddr = keccak256('ADVISOR_ROLE');
    const marketingRole = keccak256('MARKETING_ROLE');
    const liquidityRole = keccak256('LIQUIDITY_ROLE');
    const developmentRole = keccak256('DEVELOPMENT_ROLE');
    const ecosystemRole = keccak256('ECOSYSTEM_ROLE');
    const tokensaleRole = keccak256('TOKENSALE_ROLE');
    const airdropRole = keccak256('AIRDROP_ROLE');
    const grantsRole = keccak256('GRANTS_ROLE');

    const teamPercentage = 10;
    const advisorPercentage = 5;
    const marketingPercentage = 8;
    const liquidityPercentage = 8;
    const developmentPercentage = 10;
    const ecosystemPercentage = 20;
    const tokensalePercentage = 30;
    const airdropPercentage = 3;
    const grantPercentage = 6;
    const tokenomicsBalance = 40500000000000000;
    const dividentBalance = 4500000000000000;
    
    // Tokenomics Deployment
    const FloyxTokenomics = await ethers.getContractFactory("FloyxTokenomics");
    const hardhatFloyxTokenomics = await FloyxTokenomics.deploy();
    hardhatFloyxTokenomics.init(hardhatToken.address,
                                  [teamaddr, advisoraddr, marketingRole, liquidityRole, developmentRole, ecosystemRole, tokensaleRole, airdropRole, grantsRole],
                                  [addr1.address, addr2.address, addr3.address, addr4.address, addr5.address, addr6.address, addr7.address, addr8.address, addr9.address],
                                  [teamPercentage, advisorPercentage, marketingPercentage, liquidityPercentage, developmentPercentage, 
                                    ecosystemPercentage, tokensalePercentage, airdropPercentage, grantPercentage],
                                    [10, 10, 5, 1, 5, 5, 1, 2, 5]);
          
    const transfer = await hardhatToken.transfer(hardhatFloyxTokenomics.address, tokenomicsBalance.toString())
                                                                                 
    // forward time to 20 months
    const sevenDays = 60 * 60 * 24 * 30 * 20 ;
    await ethers.provider.send('evm_increaseTime', [sevenDays]);
    await hardhatFloyxTokenomics.connect(addr5).developmentClaim();


    // All Claim amount shoule be equal to Compare percentage of team                                
    expect(await hardhatToken.balanceOf(addr5.address)/100000000000000).to.equal(await (((flowtotalBalance/100000000000000)/100)*developmentPercentage));

  });

  it("Claim all Installments of ECOSYSTEM Role", async function () {
    
    const [owner,addr1,addr2,addr3,addr4,addr5,addr6,addr7,addr8,addr9] = await ethers.getSigners();
    const flowtotalBalance = 45000000000000000
    // Floyx Token Deployment
    const Token = await ethers.getContractFactory("Floyx");
    const hardhatToken = await Token.deploy("floyx","flx", flowtotalBalance.toString());


    const keccak256 = require('keccak256');
    const teamaddr = keccak256('TEAM_ROLE');
    const advisoraddr = keccak256('ADVISOR_ROLE');
    const marketingRole = keccak256('MARKETING_ROLE');
    const liquidityRole = keccak256('LIQUIDITY_ROLE');
    const developmentRole = keccak256('DEVELOPMENT_ROLE');
    const ecosystemRole = keccak256('ECOSYSTEM_ROLE');
    const tokensaleRole = keccak256('TOKENSALE_ROLE');
    const airdropRole = keccak256('AIRDROP_ROLE');
    const grantsRole = keccak256('GRANTS_ROLE');

    const teamPercentage = 10;
    const advisorPercentage = 5;
    const marketingPercentage = 8;
    const liquidityPercentage = 8;
    const developmentPercentage = 10;
    const ecosystemPercentage = 20;
    const tokensalePercentage = 30;
    const airdropPercentage = 3;
    const grantPercentage = 6;
    const tokenomicsBalance = 40500000000000000;
    const dividentBalance = 4500000000000000;
    
    // Tokenomics Deployment
    const FloyxTokenomics = await ethers.getContractFactory("FloyxTokenomics");
    const hardhatFloyxTokenomics = await FloyxTokenomics.deploy();
    hardhatFloyxTokenomics.init(hardhatToken.address,
                                  [teamaddr, advisoraddr, marketingRole, liquidityRole, developmentRole, ecosystemRole, tokensaleRole, airdropRole, grantsRole],
                                  [addr1.address, addr2.address, addr3.address, addr4.address, addr5.address, addr6.address, addr7.address, addr8.address, addr9.address],
                                  [teamPercentage, advisorPercentage, marketingPercentage, liquidityPercentage, developmentPercentage, 
                                    ecosystemPercentage, tokensalePercentage, airdropPercentage, grantPercentage],
                                    [10, 10, 5, 1, 5, 5, 1, 2, 5]);
    const transfer = await hardhatToken.transfer(hardhatFloyxTokenomics.address, tokenomicsBalance.toString())
                                                                                 
    // forward time to 20 months
    const sevenDays = 60 * 60 * 24 * 30 * 20 ;
    await ethers.provider.send('evm_increaseTime', [sevenDays]);
    await hardhatFloyxTokenomics.connect(addr6).ecosystemClaim();

    console.log("ecosystemPercentage::",await hardhatToken.balanceOf(addr6.address)/100000000000000);
    console.log("ecosystemPercentage:",await (((flowtotalBalance/100000000000000)/100)*ecosystemPercentage));

    // All Claim amount shoule be equal to Compare percentage of team                                
    expect(await hardhatToken.balanceOf(addr6.address)/100000000000000).to.equal(await (((flowtotalBalance/100000000000000)/100)*ecosystemPercentage));

  });

  it("Claim all Installments of TokenSale Role", async function () {
    
    const [owner,addr1,addr2,addr3,addr4,addr5,addr6,addr7,addr8,addr9] = await ethers.getSigners();
    const flowtotalBalance = 45000000000000000
    // Floyx Token Deployment
    const Token = await ethers.getContractFactory("Floyx");
    const hardhatToken = await Token.deploy("floyx","flx", flowtotalBalance.toString());


    const keccak256 = require('keccak256');
    const teamaddr = keccak256('TEAM_ROLE');
    const advisoraddr = keccak256('ADVISOR_ROLE');
    const marketingRole = keccak256('MARKETING_ROLE');
    const liquidityRole = keccak256('LIQUIDITY_ROLE');
    const developmentRole = keccak256('DEVELOPMENT_ROLE');
    const ecosystemRole = keccak256('ECOSYSTEM_ROLE');
    const tokensaleRole = keccak256('TOKENSALE_ROLE');
    const airdropRole = keccak256('AIRDROP_ROLE');
    const grantsRole = keccak256('GRANTS_ROLE');

    const teamPercentage = 10;
    const advisorPercentage = 5;
    const marketingPercentage = 8;
    const liquidityPercentage = 8;
    const developmentPercentage = 10;
    const ecosystemPercentage = 20;
    const tokensalePercentage = 30;
    const airdropPercentage = 3;
    const grantPercentage = 6;
    const tokenomicsBalance = 40500000000000000;
    const dividentBalance = 4500000000000000;
    
    // Tokenomics Deployment
    const FloyxTokenomics = await ethers.getContractFactory("FloyxTokenomics");
    const hardhatFloyxTokenomics = await FloyxTokenomics.deploy();
    hardhatFloyxTokenomics.init(hardhatToken.address,
                                  [teamaddr, advisoraddr, marketingRole, liquidityRole, developmentRole, ecosystemRole, tokensaleRole, airdropRole, grantsRole],
                                  [addr1.address, addr2.address, addr3.address, addr4.address, addr5.address, addr6.address, addr7.address, addr8.address, addr9.address],
                                  [teamPercentage, advisorPercentage, marketingPercentage, liquidityPercentage, developmentPercentage, 
                                    ecosystemPercentage, tokensalePercentage, airdropPercentage, grantPercentage],
                                    [10, 10, 5, 1, 5, 5, 1, 2, 5]);
          
    const transfer = await hardhatToken.transfer(hardhatFloyxTokenomics.address, tokenomicsBalance.toString())
                                                                                 
    // forward time to 20 months
    const sevenDays = 60 * 60 * 24 * 30 * 20 ;
    await ethers.provider.send('evm_increaseTime', [sevenDays]);
    await hardhatFloyxTokenomics.connect(addr7).tokenSaleClaim();

    console.log("tokensalePercentage::",await hardhatToken.balanceOf(addr7.address)/100000000000000);
    console.log("tokensalePercentage:",await (((flowtotalBalance/100000000000000)/100)*tokensalePercentage));

    // All Claim amount shoule be equal to Compare percentage of team                                
    expect(await hardhatToken.balanceOf(addr7.address)/100000000000000).to.equal(await (((flowtotalBalance/100000000000000)/100)*tokensalePercentage));

  });

  it("Claim all Installments of AirDrop Role", async function () {
    
    const [owner,addr1,addr2,addr3,addr4,addr5,addr6,addr7,addr8,addr9] = await ethers.getSigners();
    const flowtotalBalance = 45000000000000000
    // Floyx Token Deployment
    const Token = await ethers.getContractFactory("Floyx");
    const hardhatToken = await Token.deploy("floyx","flx", flowtotalBalance.toString());


    const keccak256 = require('keccak256');
    const teamaddr = keccak256('TEAM_ROLE');
    const advisoraddr = keccak256('ADVISOR_ROLE');
    const marketingRole = keccak256('MARKETING_ROLE');
    const liquidityRole = keccak256('LIQUIDITY_ROLE');
    const developmentRole = keccak256('DEVELOPMENT_ROLE');
    const ecosystemRole = keccak256('ECOSYSTEM_ROLE');
    const tokensaleRole = keccak256('TOKENSALE_ROLE');
    const airdropRole = keccak256('AIRDROP_ROLE');
    const grantsRole = keccak256('GRANTS_ROLE');

    const teamPercentage = 10;
    const advisorPercentage = 5;
    const marketingPercentage = 8;
    const liquidityPercentage = 8;
    const developmentPercentage = 10;
    const ecosystemPercentage = 20;
    const tokensalePercentage = 30;
    const airdropPercentage = 3;
    const grantPercentage = 6;
    const tokenomicsBalance = 40500000000000000;
    const dividentBalance = 4500000000000000;
    
    // Tokenomics Deployment
    const FloyxTokenomics = await ethers.getContractFactory("FloyxTokenomics");
    const hardhatFloyxTokenomics = await FloyxTokenomics.deploy();
    hardhatFloyxTokenomics.init(hardhatToken.address,
                                  [teamaddr, advisoraddr, marketingRole, liquidityRole, developmentRole, ecosystemRole, tokensaleRole, airdropRole, grantsRole],
                                  [addr1.address, addr2.address, addr3.address, addr4.address, addr5.address, addr6.address, addr7.address, addr8.address, addr9.address],
                                  [teamPercentage, advisorPercentage, marketingPercentage, liquidityPercentage, developmentPercentage, 
                                    ecosystemPercentage, tokensalePercentage, airdropPercentage, grantPercentage],
                                    [10, 10, 5, 1, 5, 5, 1, 2, 5]);
          
    const transfer = await hardhatToken.transfer(hardhatFloyxTokenomics.address, tokenomicsBalance.toString())
                                                                                 
    // forward time to 20 months
    const sevenDays = 60 * 60 * 24 * 30 * 20 ;
    await ethers.provider.send('evm_increaseTime', [sevenDays]);
    await hardhatFloyxTokenomics.connect(addr8).airDropClaim();

    console.log("airdropPercentage::",await hardhatToken.balanceOf(addr8.address)/100000000000000);
    console.log("airdropPercentage:",await (((flowtotalBalance/100000000000000)/100)*airdropPercentage));

    // All Claim amount shoule be equal to Compare percentage of team                                
    expect(await hardhatToken.balanceOf(addr8.address)/100000000000000).to.equal(await (((flowtotalBalance/100000000000000)/100)*airdropPercentage));

  });

  it("Claim all Installments of Grants Role", async function () {
    
    const [owner,addr1,addr2,addr3,addr4,addr5,addr6,addr7,addr8,addr9] = await ethers.getSigners();
    const flowtotalBalance = 45000000000000000
    // Floyx Token Deployment
    const Token = await ethers.getContractFactory("Floyx");
    const hardhatToken = await Token.deploy("floyx","flx", flowtotalBalance.toString());


    const keccak256 = require('keccak256');
    const teamaddr = keccak256('TEAM_ROLE');
    const advisoraddr = keccak256('ADVISOR_ROLE');
    const marketingRole = keccak256('MARKETING_ROLE');
    const liquidityRole = keccak256('LIQUIDITY_ROLE');
    const developmentRole = keccak256('DEVELOPMENT_ROLE');
    const ecosystemRole = keccak256('ECOSYSTEM_ROLE');
    const tokensaleRole = keccak256('TOKENSALE_ROLE');
    const airdropRole = keccak256('AIRDROP_ROLE');
    const grantsRole = keccak256('GRANTS_ROLE');

    const teamPercentage = 10;
    const advisorPercentage = 5;
    const marketingPercentage = 8;
    const liquidityPercentage = 8;
    const developmentPercentage = 10;
    const ecosystemPercentage = 20;
    const tokensalePercentage = 30;
    const airdropPercentage = 3;
    const grantPercentage = 6;
    const tokenomicsBalance = 40500000000000000;
    const dividentBalance = 4500000000000000;
    
    // Tokenomics Deployment
    const FloyxTokenomics = await ethers.getContractFactory("FloyxTokenomics");
    const hardhatFloyxTokenomics = await FloyxTokenomics.deploy();
    hardhatFloyxTokenomics.init(hardhatToken.address,
                                  [teamaddr, advisoraddr, marketingRole, liquidityRole, developmentRole, ecosystemRole, tokensaleRole, airdropRole, grantsRole],
                                  [addr1.address, addr2.address, addr3.address, addr4.address, addr5.address, addr6.address, addr7.address, addr8.address, addr9.address],
                                  [teamPercentage, advisorPercentage, marketingPercentage, liquidityPercentage, developmentPercentage, 
                                    ecosystemPercentage, tokensalePercentage, airdropPercentage, grantPercentage],
                                    [10, 10, 5, 1, 5, 5, 1, 2, 5]);
          
    const transfer = await hardhatToken.transfer(hardhatFloyxTokenomics.address, tokenomicsBalance.toString())
                                                                                 
    // forward time to 20 months
    const sevenDays = 60 * 60 * 24 * 90 * 90 ;
    await ethers.provider.send('evm_increaseTime', [sevenDays]);
    await hardhatFloyxTokenomics.connect(addr9).grantsClaim();

    console.log("grantPercentage::",await hardhatToken.balanceOf(addr9.address)/100000000000000);
    console.log("grantPercentage:",await (((flowtotalBalance/100000000000000)/100)*grantPercentage));

    // All Claim amount shoule be equal to Compare percentage of team                                
    expect(await hardhatToken.balanceOf(addr9.address)/100000000000000).to.equal(await (((flowtotalBalance/100000000000000)/100)*grantPercentage));

  });

  it("Double Claim Grant Installments", async function () {
    
    const [owner,addr1,addr2,addr3,addr4,addr5,addr6,addr7,addr8,addr9] = await ethers.getSigners();
    const flowtotalBalance = 45000000000000000
    // Floyx Token Deployment
    const Token = await ethers.getContractFactory("Floyx");
    const hardhatToken = await Token.deploy("floyx","flx", flowtotalBalance.toString());


    const keccak256 = require('keccak256');
    const teamaddr = keccak256('TEAM_ROLE');
    const advisoraddr = keccak256('ADVISOR_ROLE');
    const marketingRole = keccak256('MARKETING_ROLE');
    const liquidityRole = keccak256('LIQUIDITY_ROLE');
    const developmentRole = keccak256('DEVELOPMENT_ROLE');
    const ecosystemRole = keccak256('ECOSYSTEM_ROLE');
    const tokensaleRole = keccak256('TOKENSALE_ROLE');
    const airdropRole = keccak256('AIRDROP_ROLE');
    const grantsRole = keccak256('GRANTS_ROLE');

    const teamPercentage = 10;
    const advisorPercentage = 5;
    const marketingPercentage = 8;
    const liquidityPercentage = 8;
    const developmentPercentage = 10;
    const ecosystemPercentage = 20;
    const tokensalePercentage = 30;
    const airdropPercentage = 3;
    const grantPercentage = 6;
    const tokenomicsBalance = 40500000000000000;
    const dividentBalance = 4500000000000000;
    
    // Tokenomics Deployment
    const FloyxTokenomics = await ethers.getContractFactory("FloyxTokenomics");
    const hardhatFloyxTokenomics = await FloyxTokenomics.deploy();
    hardhatFloyxTokenomics.init(hardhatToken.address,
                                  [teamaddr, advisoraddr, marketingRole, liquidityRole, developmentRole, ecosystemRole, tokensaleRole, airdropRole, grantsRole],
                                  [addr1.address, addr2.address, addr3.address, addr4.address, addr5.address, addr6.address, addr7.address, addr8.address, addr9.address],
                                  [teamPercentage, advisorPercentage, marketingPercentage, liquidityPercentage, developmentPercentage, 
                                    ecosystemPercentage, tokensalePercentage, airdropPercentage, grantPercentage],
                                    [10, 10, 5, 1, 5, 5, 1, 2, 5]);
          
    const transfer = await hardhatToken.transfer(hardhatFloyxTokenomics.address, flowtotalBalance.toString())
                                                                                 
    // forward time to 20 months
    const sevenDays = 60 * 60 * 24 * 90 * 90 ;
    await ethers.provider.send('evm_increaseTime', [sevenDays]);
    await hardhatFloyxTokenomics.connect(addr9).grantsClaim();

    // All Claim amount shoule be equal to Compare percentage of team                                
    await expect(hardhatFloyxTokenomics.connect(addr9).grantsClaim()).to.be.revertedWith('Floyx Tokenomics : All token payments already completed');
  });

  it("Claim All Installments", async function () {
    
    const [owner,addr1,addr2,addr3,addr4,addr5,addr6,addr7,addr8,addr9] = await ethers.getSigners();
    const flowtotalBalance = 45000000000000000
    // Floyx Token Deployment
    const Token = await ethers.getContractFactory("Floyx");
    const hardhatToken = await Token.deploy("floyx","flx", flowtotalBalance.toString());

    const keccak256 = require('keccak256');
    const teamaddr = keccak256('TEAM_ROLE');
    const advisoraddr = keccak256('ADVISOR_ROLE');
    const marketingRole = keccak256('MARKETING_ROLE');
    const liquidityRole = keccak256('LIQUIDITY_ROLE');
    const developmentRole = keccak256('DEVELOPMENT_ROLE');
    const ecosystemRole = keccak256('ECOSYSTEM_ROLE');
    const tokensaleRole = keccak256('TOKENSALE_ROLE');
    const airdropRole = keccak256('AIRDROP_ROLE');
    const grantsRole = keccak256('GRANTS_ROLE');

    const teamPercentage = 10;
    const advisorPercentage = 5;
    const marketingPercentage = 8;
    const liquidityPercentage = 8;
    const developmentPercentage = 10;
    const ecosystemPercentage = 20;
    const tokensalePercentage = 30;
    const airdropPercentage = 3;
    const grantPercentage = 6;
    const tokenomicsBalance = 40500000000000000;
    const dividentBalance = 4500000000000000;
    
    // Tokenomics Deployment
    const FloyxTokenomics = await ethers.getContractFactory("FloyxTokenomics");
    const hardhatFloyxTokenomics = await FloyxTokenomics.deploy();
    hardhatFloyxTokenomics.init(hardhatToken.address,
                                  [teamaddr, advisoraddr, marketingRole, liquidityRole, developmentRole, ecosystemRole, tokensaleRole, airdropRole, grantsRole],
                                  [addr1.address, addr2.address, addr3.address, addr4.address, addr5.address, addr6.address, addr7.address, addr8.address, addr9.address],
                                  [teamPercentage, advisorPercentage, marketingPercentage, liquidityPercentage, developmentPercentage, 
                                    ecosystemPercentage, tokensalePercentage, airdropPercentage, grantPercentage],
                                    [10, 10, 5, 1, 5, 5, 1, 2, 5]);
          
    const transfer = await hardhatToken.transfer(hardhatFloyxTokenomics.address, flowtotalBalance.toString())
                                                                                 
    // forward time to 20 months
    const sevenDays = 60 * 60 * 24 * 90 * 90 ;
    await ethers.provider.send('evm_increaseTime', [sevenDays]);
    await hardhatFloyxTokenomics.connect(addr1).teamClaim();
    await hardhatFloyxTokenomics.connect(addr2).advisorClaim();
    await hardhatFloyxTokenomics.connect(addr3).marketingClaim()
    await hardhatFloyxTokenomics.connect(addr4).liquidityClaim();
    await hardhatFloyxTokenomics.connect(addr5).developmentClaim();
    await hardhatFloyxTokenomics.connect(addr6).ecosystemClaim();
    await hardhatFloyxTokenomics.connect(addr7).tokenSaleClaim();
    await hardhatFloyxTokenomics.connect(addr8).airDropClaim();
    await hardhatFloyxTokenomics.connect(addr9).grantsClaim();
    const balanceTokenomics = await hardhatToken.balanceOf(hardhatFloyxTokenomics.address)
    // All Claim amount shoule be equal to Compare percentage of team                                
    expect(balanceTokenomics.toString()).to.equal("0");
  });
  

  it("Claim Lock Installments", async function () {
    
    const [owner,addr1,addr2,addr3,addr4,addr5,addr6,addr7,addr8,addr9] = await ethers.getSigners();
    const flowtotalBalance = 45000000000000000
    // Floyx Token Deployment
    const Token = await ethers.getContractFactory("Floyx");
    const hardhatToken = await Token.deploy("floyx","flx", flowtotalBalance.toString());

    const keccak256 = require('keccak256');
    const teamaddr = keccak256('TEAM_ROLE');
    const advisoraddr = keccak256('ADVISOR_ROLE');
    const marketingRole = keccak256('MARKETING_ROLE');
    const liquidityRole = keccak256('LIQUIDITY_ROLE');
    const developmentRole = keccak256('DEVELOPMENT_ROLE');
    const ecosystemRole = keccak256('ECOSYSTEM_ROLE');
    const tokensaleRole = keccak256('TOKENSALE_ROLE');
    const airdropRole = keccak256('AIRDROP_ROLE');
    const grantsRole = keccak256('GRANTS_ROLE');

    const teamPercentage = 10;
    const advisorPercentage = 5;
    const marketingPercentage = 8;
    const liquidityPercentage = 8;
    const developmentPercentage = 10;
    const ecosystemPercentage = 20;
    const tokensalePercentage = 30;
    const airdropPercentage = 3;
    const grantPercentage = 6;
    const tokenomicsBalance = 40500000000000000;
    const dividentBalance = 4500000000000000;
    
    // Tokenomics Deployment
    const FloyxTokenomics = await ethers.getContractFactory("FloyxTokenomics");
    const hardhatFloyxTokenomics = await FloyxTokenomics.deploy();
    hardhatFloyxTokenomics.init(hardhatToken.address,
                                  [teamaddr, advisoraddr, marketingRole, liquidityRole, developmentRole, ecosystemRole, tokensaleRole, airdropRole, grantsRole],
                                  [addr1.address, addr2.address, addr3.address, addr4.address, addr5.address, addr6.address, addr7.address, addr8.address, addr9.address],
                                  [teamPercentage, advisorPercentage, marketingPercentage, liquidityPercentage, developmentPercentage, 
                                    ecosystemPercentage, tokensalePercentage, airdropPercentage, grantPercentage],
                                    [10, 10, 5, 1, 5, 5, 1, 2, 5]);
          
    const transfer = await hardhatToken.transfer(hardhatFloyxTokenomics.address, flowtotalBalance.toString())
    hardhatFloyxTokenomics.lockClaims();                                                                             
    // forward time to 20 months
    const sevenDays = 60 * 60 * 24 * 90 * 90 ;
    await ethers.provider.send('evm_increaseTime', [sevenDays]);

    await expect(hardhatFloyxTokenomics.connect(addr1).teamClaim()).to.be.revertedWith('Floyx Tokenomics : Claim is locked now. Please try again later');
    await expect( hardhatFloyxTokenomics.connect(addr2).advisorClaim()).to.be.revertedWith('Floyx Tokenomics : Claim is locked now. Please try again later');
    await expect( hardhatFloyxTokenomics.connect(addr3).marketingClaim()).to.be.revertedWith('Floyx Tokenomics : Claim is locked now. Please try again later');
    await expect( hardhatFloyxTokenomics.connect(addr4).liquidityClaim()).to.be.revertedWith('Floyx Tokenomics : Claim is locked now. Please try again later');
    await expect( hardhatFloyxTokenomics.connect(addr5).developmentClaim()).to.be.revertedWith('Floyx Tokenomics : Claim is locked now. Please try again later');
    await expect( hardhatFloyxTokenomics.connect(addr6).ecosystemClaim()).to.be.revertedWith('Floyx Tokenomics : Claim is locked now. Please try again later');
    await expect( hardhatFloyxTokenomics.connect(addr7).tokenSaleClaim()).to.be.revertedWith('Floyx Tokenomics : Claim is locked now. Please try again later');
    await expect( hardhatFloyxTokenomics.connect(addr8).airDropClaim()).to.be.revertedWith('Floyx Tokenomics : Claim is locked now. Please try again later');
    await expect( hardhatFloyxTokenomics.connect(addr9).grantsClaim()).to.be.revertedWith('Floyx Tokenomics : Claim is locked now. Please try again later');
    const balanceTokenomics = await hardhatToken.balanceOf(hardhatFloyxTokenomics.address)

    expect(balanceTokenomics.toString()).to.equal(flowtotalBalance.toString());
  });
});
