// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/utils/Strings.sol";
import "./SafeMath.sol";
import "./IERC20.sol";
contract SaadToken {

    using SafeMath for uint256;
    uint256 public counterteam;

    IERC20 internal func_;

    
    uint256 public deployedTime;
    mapping(address => uint) public allowanceteam;
    uint256 public paymentPerMonthTeam;
    uint256 public installmentsTeam;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    constructor(address _token) { 
       // balanceOf[msg.sender] = _initialSupply;
       // totalSupply = _initialSupply;
        deployedTime = block.timestamp;
        func_ = IERC20(_token);
        uint256 supply = func_.totalSupply();
        // 10 % to supply team
        allowanceteam[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2] = percentage(supply,10);
        paymentPerMonthTeam = percentage(allowanceteam[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2],10);
        installmentsTeam = allowanceteam[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2]/paymentPerMonthTeam;
        counterteam = 0;
    }



    // Lockout 6 months, 10% every month
    function claimTeam() public payable{
        uint256 lockPeriod = 1;
        require(allowanceteam[msg.sender] != 0, "You are not in Team allowance list");
         // 6 months check
     //   require(elapsedMonths(lockPeriod) >= deployedTime, "Your Time has not elapsed for transaction!");
        require(allowanceteam[msg.sender]>0,"PaymentsCompleted");
        uint256 presentTime= block.timestamp; 
        uint256 monthsToPay = elapsedMonths(presentTime.sub(deployedTime),lockPeriod);
        require (monthsToPay != 0, "No due Payments yet");
    
    //  monthsToPay=monthsToPay.add()
    
        require(monthsToPay != counterteam,"No due Payments yet");

        if (monthsToPay>0) {
            uint256 len;
            uint256 amountdue=0;
            for(len=counterteam;len<monthsToPay;len++){
                amountdue += paymentPerMonthTeam;
                counterteam += 1;
            }
            allowanceteam[msg.sender] = allowanceteam[msg.sender].sub(amountdue);
            func_.transfer(msg.sender,amountdue);

        }
    }
  
    function percentage(uint256 _number,uint256 _percentage) public returns(uint256) {
        return (_number.div(100).mul(_percentage));
    }

    function elapsedMonths(uint256 _number,uint256 _lockPeriod) public returns(uint256) {
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
    function calculateMonths() public returns(uint256) {
        uint256 presentTime= block.timestamp; 
        presentTime=presentTime.sub(deployedTime);
        return presentTime;
    }
}


