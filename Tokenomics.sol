// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/utils/Strings.sol";
import "./SafeMath.sol";
import "./IERC20.sol";

contract FloyxTokenomics {

    using SafeMath for uint256;
    uint256 public constant unixtimeOneMonth = 60;//2592000; //60*60*24*30
    uint256 public deployedTime;

    mapping(string => address)public roles;
    mapping(address => uint256)public tokenAllowance;

    mapping(address => uint256) public paymentPerMonth;
    mapping(address => uint) public remainingInstallments;
    mapping(address => uint) public completedInstallments;

    IERC20 internal floyx;

    event FundsReleased(address indexed recepient, uint256 amount);
                    // 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,10,10,5,5,2

    constructor(string[] memory roles_, address[] memory addresses_, uint256[] memory allowancePercentage_, 
        uint256[] memory installmentPercentage_, address floyxAddress){

        require(addresses_.length == roles_.length);
        deployedTime = block.timestamp;
        floyx = IERC20(floyxAddress);

        uint256 totalSupply = floyx.totalSupply();
        for (uint8 i=0; i< addresses_.length; i++){
            roles[roles_[i]] = addresses_[i];

            tokenAllowance[addresses_[i]] = percentage(totalSupply, allowancePercentage_[i]) ; // total supply percentage
            paymentPerMonth[addresses_[i]] = percentage(tokenAllowance[addresses_[i]], installmentPercentage_[i]); // installments of supply
            remainingInstallments[addresses_[i]] =  tokenAllowance[addresses_[i]].div(paymentPerMonth[addresses_[i]]);
        }
    }

    function distributeInstallment(address recepient, uint256 monthsToPay) public{
        uint256 amountDue=0;
        monthsToPay = monthsToPay.sub(completedInstallments[recepient]);
        for(uint256 len=monthsToPay; len>0; len--){
            if(remainingInstallments[recepient] == 0){
                break;
            }

            amountDue = amountDue.add(paymentPerMonth[recepient]);
            remainingInstallments[recepient] = remainingInstallments[recepient].sub(1);
            completedInstallments[recepient] = completedInstallments[recepient].add(1);
        }

        if (amountDue > 0) {
            floxyTransfer(amountDue,recepient);
        }
    }

    function teamClaim()public{
        string memory role = "team";
        _verifyClaim(role, msg.sender);
        uint256 monthsToPay = elapsedMonths(0);
        require (monthsToPay > 0, "No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }

    function advisorClaim()public{
        string memory role = "advisorsAndPartnership";
        _verifyClaim(role, msg.sender);
        uint256 monthsToPay = elapsedMonths(0);
        monthsToPay = monthsToPay.div(3);
        require (monthsToPay > 0, "No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }

    function marketingClaim()public{
        string memory role = "marketing";
        _verifyClaim(role, msg.sender);
        uint256 monthsToPay = elapsedMonths(0);
        require (monthsToPay > 0, "No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }

    function liquidityClaim()public{
        string memory role = "liquidity";
        _verifyClaim(role, msg.sender);

        distributeInstallment(msg.sender,remainingInstallments[msg.sender]);
    }

    function developmentClaim()public{
        string memory role = "development";
        _verifyClaim(role, msg.sender);
        uint256 monthsToPay = elapsedMonths(0);
        require (monthsToPay > 0, "No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }

    function ecosystemClaim()public{
        string memory role = "ecosystemFunds";
        _verifyClaim(role, msg.sender);
        uint256 monthsToPay = elapsedMonths(0);
        require (monthsToPay > 0, "No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }


    function tokenSaleClaim()public{
        string memory role = "tokenSale";
        _verifyClaim(role, msg.sender);

        distributeInstallment(msg.sender,remainingInstallments[msg.sender]);
    }

    function airDropClaim()public{
        string memory role = "ecosystemFunds";
        _verifyClaim(role, msg.sender);
        uint256 monthsToPay = elapsedMonths(0);
        require (monthsToPay > 0, "No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }

    function grantsClaim()public{
        string memory role = "ecosystemFunds";
        _verifyClaim(role, msg.sender);
        uint256 monthsToPay = elapsedMonths(3); // 3 months lockout period
        require (monthsToPay > 0, "No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }

    function _verifyClaim(string memory role_,address user_)internal view {
        require(roles[role_] == user_, "Invalid caller");
        require(tokenAllowance[user_] > 0, "Payments already Completed");
        require(remainingInstallments[user_] > 0, "installments completed");
    }

    function floxyTransfer(uint256 amountDue,address recepient) internal{
            tokenAllowance[recepient] = tokenAllowance[recepient].sub(amountDue);
            floyx.transfer(recepient,amountDue);
            emit FundsReleased(recepient, amountDue);
    }
  
    function percentage(uint256 totalAmount_,uint256 _percentage) internal pure returns(uint256) {
        return (totalAmount_.mul(_percentage).div(100));
    }

    function elapsedMonths(uint256 _lockPeriod) internal view returns(uint256) {
        uint256 presentTime = block.timestamp;
        uint256 elapsedTime = presentTime.sub(deployedTime);
     
        uint256 unixlocktime = _lockPeriod.mul(unixtimeOneMonth);
        require(elapsedTime > unixlocktime,"Lock period is active");
        elapsedTime = elapsedTime.sub(unixlocktime);
        require(elapsedTime > 0, "Lock period is active");      
        uint256 elapsedMonth = elapsedTime.div(unixtimeOneMonth);
        return elapsedMonth;
    }
}