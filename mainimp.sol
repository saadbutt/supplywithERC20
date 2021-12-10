// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/utils/Strings.sol";
import "./SafeMath.sol";
import "./IERC20.sol";
contract SaadToken {

    using SafeMath for uint256;
    uint256 public teamCounter;
    uint256 public deployedTime;
    uint256 public paymentPerMonthTeam;
    uint256 public installmentsTeam;
    
    IERC20 internal floyx;
    
    mapping(address => uint) public tokenAllowance;

    event FundsReleased(address indexed recepient, uint256 amount);

    constructor(address tokenAddress_, address teamAddress_, uint256 teamPercentage_) { 

        deployedTime = block.timestamp;
        floyx = IERC20(tokenAddress_);
        uint256 supply = floyx.totalSupply();
        tokenAllowance[teamAddress_] = percentage(supply,teamPercentage_); // 10 % to supply team
        paymentPerMonthTeam = percentage(tokenAllowance[teamAddress_],teamPercentage_);
        installmentsTeam = tokenAllowance[teamAddress_].div(paymentPerMonthTeam);
        teamCounter = 0;

    }

    // Lockout 6 months, 10% every month
    function claimTeam() public payable{
        require(tokenAllowance[msg.sender] != 0, "You are not in Team allowance list");
        require(tokenAllowance[msg.sender]>0,"PaymentsCompleted");

        uint256 lockPeriod = 1;
        uint256 presentTime= block.timestamp; 
        uint256 monthsToPay = elapsedMonths(presentTime.sub(deployedTime),lockPeriod);

        require (monthsToPay != 0, "No due Payments yet");
        require(monthsToPay != teamCounter,"No due Payments yet");

        if (monthsToPay>0) {
            uint256 amountdue=0;
            for(uint256 len=teamCounter; len<monthsToPay; len++){
                amountdue = amountdue.add(paymentPerMonthTeam);
                teamCounter = teamCounter.add(1);
            }
            tokenAllowance[msg.sender] = tokenAllowance[msg.sender].sub(amountdue);
            floyx.transfer(msg.sender,amountdue);
            emit FundsReleased(msg.sender, amountdue);
        }
    }
  
    function percentage(uint256 _number,uint256 _percentage) public pure returns(uint256) {
        return (_number.mul(_percentage).div(100));
    }

    function elapsedMonths(uint256 _number,uint256 _lockPeriod) public view returns(uint256) {
        uint256 unixtimeOneMonth = 60;//2592000; //60*60*24*30
        uint256 unixlocktime = _lockPeriod.mul(unixtimeOneMonth);

        require(_number>unixlocktime,"Lock period is active");

        _number = _number.sub(unixlocktime);
        if (_number<=0) {
            return 0;
        }

        uint256 res =_number.div(unixtimeOneMonth);
        
        if(res > installmentsTeam){
            res = installmentsTeam;
        }

        return res;
    }

    // How much time spent after deployment time
    function calculateMonths() public view returns(uint256) {
        uint256 presentTime = block.timestamp; 
        presentTime = presentTime.sub(deployedTime);
        return presentTime;
    }
}


