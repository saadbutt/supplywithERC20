async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    // const Contract = await ethers.getContractFactory("Floyx");
    // const contract = await Contract.deploy("FLXTEST", "TFLX", "4500000000000000000");
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


    // Tokenomics Deployment
    const FloyxTokenomics = await ethers.getContractFactory("FloyxTokenomics");
    const hardhatFloyxTokenomics = await FloyxTokenomics.deploy();
    hardhatFloyxTokenomics.init('0xe970d0717ea3ee6ba0f0767ae50240f657919bc5',
                                  [0x5146a08baf902532d0ee2f909971144f12ca32651cd70cbee1117cddfb3b3b33, 0x9c1ca198f61ac1647c38f20b6678649f8e87b7e06309094d812edd1e9119d309,
                                    0x33ed200cce320c90b0f5226969f1f198e39ade4221f23425218e256d5152f765, 0x39a8b3e6e97619937505a2ae24f70fc909c329e7595f016056def5c61ec407f4, 
                                    0x5351739d55170cfb22a4ca0ed7c81953f896619e021ad6df97d197953d00ffd2, 0xdd7f4dc9b35ac72d649723b085bbc7dd3f5d3da1af9751c1605dc4aa94a94866,
                                    0xa08aacfe27eee176d3a98646161bdd8127a631f5d126a7366caa91d0f6ac9fde, 0x3a2f235c9daaf33349d300aadff2f15078a89df81bcfdd45ba11c8f816bddc6f, 
                                    0x175d7b85ff1bc91c4b0c406862c9875f787d29798bfc84e43d7eda7bb7543a31],
                                  ['0x400909bA11ddD27064aaBed0aA969663AC82CF6a', '0x5CeB4C9E7384BDb94e20Ee5034C960379f997354', '0x63673908A48E1475b9CdfAdED1b704dF2B34AC7e', '0x44d6178A8B676241b11bF6b894Ca88FafA88eB4f', 
                                  '0xc360C5060Bd5C227B45Fe28dde61Dd0744fD2754', '0x8fA308B5C0fAa8c1b862a68D22986fd9342832a8', '0x8aB28Ed11955cc59d4CE834C569B7B84c9c4C925', '0xaa0383Fca07496F48cbf89BB8AD118313bc56152', 
                                  '0xBE2f213ff8af31e938A78Ec5626551d802BA3eD3'],
                                  [teamPercentage, advisorPercentage, marketingPercentage, liquidityPercentage, developmentPercentage, 
                                    ecosystemPercentage, tokensalePercentage, airdropPercentage, grantPercentage],
                                    [10, 10, 5, 1, 5, 5, 1, 2, 5]);
  
    console.log("Contract address:", hardhatFloyxTokenomics);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });