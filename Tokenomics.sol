// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/utils/Strings.sol";
import "./SafeMath.sol";
import "./IERC20.sol";

contract FloyxTokenomics {

    using SafeMath for uint256;
    uint256 public constant unixtimeOneMonth = 60;//2592000; //60*60*24*30
    uint256 public teamCounter;
    uint256 public deployedTime;
    uint256 public paymentPerMonthTeam;
    uint256 public installmentsTeam;
    uint256 public paymentPerMonthAdvisor;
    uint256 public installmentsAdvisor;
    uint256 public paymentPerMonthMarketing;
    uint256 public installmentsMarketing;
    uint256 public paymentPerMonthDevelopment;
    uint256 public installmentsDevelopment;
    uint256 public paymentPerMonthAirdrop;
    uint256 public installmentsAirdrop;

    mapping(address => uint256) public paymentPerMonth;
    mapping(address => uint) public installmentLimit;


    
    IERC20 internal floyx;
    
    mapping(address => uint) public tokenAllowance;

    event FundsReleased(address indexed recepient, uint256 amount);
                    // 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,10,10,5,5,2
    constructor(address tokenAddress_, address teamAddress_, uint256 teamPercentage_,address advisorAddress_,uint256 advisorPercentage_,address marketingAddress_,uint256 marketingPercentage_,address developmentAddress_,uint256 developmentPercentage_,address airdropAddress_,uint256 airdropPercentage_) { 

        deployedTime = block.timestamp;
        floyx = IERC20(tokenAddress_);
        uint256 supply = floyx.totalSupply();

        tokenAllowance[teamAddress_] = percentage(supply,teamPercentage_); // 10 % to supply team
        paymentPerMonthTeam = percentage(tokenAllowance[teamAddress_],teamPercentage_);
        installmentsTeam = tokenAllowance[teamAddress_].div(paymentPerMonthTeam);

        tokenAllowance[advisorAddress_] = percentage(supply,advisorPercentage_); // 10 % to Advisor team every quarter
        paymentPerMonthAdvisor = percentage(tokenAllowance[advisorAddress_],advisorPercentage_);
        installmentsAdvisor = tokenAllowance[advisorAddress_].div(paymentPerMonthAdvisor);

        tokenAllowance[marketingAddress_] = percentage(supply,marketingPercentage_); // 5 % to Marketing team 
        paymentPerMonthMarketing = percentage(tokenAllowance[marketingAddress_],5);
        installmentsMarketing = tokenAllowance[marketingAddress_].div(paymentPerMonthMarketing);

        tokenAllowance[developmentAddress_] = percentage(supply,developmentPercentage_); // 12 % to Development team 
        paymentPerMonthDevelopment = percentage(tokenAllowance[developmentAddress_],5);
        installmentsDevelopment = tokenAllowance[developmentAddress_].div(paymentPerMonthDevelopment);

        tokenAllowance[airdropAddress_] = percentage(supply,airdropPercentage_); // 3 % to AirDrop team 
        paymentPerMonthAirdrop = percentage(tokenAllowance[airdropAddress_],2);
        installmentsAirdrop = tokenAllowance[airdropAddress_].div(paymentPerMonthAirdrop);
        
    }

    // Lockout 6 months, 10% every month
    function claimTeam() public payable{
        require(tokenAllowance[msg.sender] != 0, "You are not in Team allowance list");
        require(tokenAllowance[msg.sender] > 0, "Payments Completed");
        uint256 lockPeriod = 1; // different
        uint256 presentTime= block.timestamp; 
        uint256 monthsToPay = elapsedMonths(presentTime.sub(deployedTime),lockPeriod);

        require (monthsToPay != 0, "No due Payments yet");
        require(monthsToPay != teamCounter,"No due Payments yet");

        if (monthsToPay>0) {
            uint256 amountDue=0;
            for(uint256 len=teamCounter; len<monthsToPay; len++){
                amountDue = amountDue.add(paymentPerMonthTeam);
                teamCounter = teamCounter.add(1);
            }
            floxyTransfer(amountDue,msg.sender);
        }
    }

    function floxyTransfer(uint256 amountDue,address recepient) internal{
            tokenAllowance[recepient] = tokenAllowance[recepient].sub(amountDue);
            floyx.transfer(recepient,amountDue);
            emit FundsReleased(recepient, amountDue);
    }
  
    function percentage(uint256 _number,uint256 _percentage) public pure returns(uint256) {
        return (_number.mul(_percentage).div(100));
    }

    function elapsedMonths(uint256 _number,uint256 _lockPeriod) public view returns(uint256) {
        uint256 unixlocktime = _lockPeriod.mul(unixtimeOneMonth);
        require(_number>unixlocktime,"Lock period is active");
        _number = _number.sub(unixlocktime);
        if (_number<=0) {return 0;}
        uint256 res =_number.div(unixtimeOneMonth);
        if(res > installmentsTeam){ res = installmentsTeam; }

        return res;
    }
}

