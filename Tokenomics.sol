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

    address public addres;

    IERC20 internal floyx;

    event FundsReleased(address indexed recepient, uint256 amount);
                    // 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,10,10,5,5,2

    constructor(string[] memory roles_, address[] memory addresses_, uint256[] memory allowancePercentage_, 
        uint256[] memory installmentPercentage_, address floyxAddress)public payable {

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

    function distributeInstallment(address recepient, uint256 monthsToPay) public payable {
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

    function teamClaim()public payable{
        string memory role = "team";
        require(roles[role] == msg.sender, "Invalid caller");
        require(tokenAllowance[msg.sender] > 0, "Payments already Completed");
        require(remainingInstallments[msg.sender] > 0, "installments completed");
        uint256 monthsToPay = elapsedMonths(0);
        require (monthsToPay > 0, "No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }

    function teamAdvisor()public payable{
        string memory role = "advisorsAndPartnership";
        require(roles[role] == msg.sender, "Invalid caller");
        require(tokenAllowance[msg.sender] > 0, "Payments already Completed");
        require(remainingInstallments[msg.sender] > 0, "installments completed");
        uint256 monthsToPay = elapsedMonths(0);
        monthsToPay = monthsToPay.div(3);
        require (monthsToPay > 0, "No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }

    function teamMarketing()public payable{
        string memory role = "marketing";
        require(roles[role] == msg.sender, "Invalid caller");
        require(tokenAllowance[msg.sender] > 0, "Payments already Completed");
        require(remainingInstallments[msg.sender] > 0, "installments completed");
        uint256 monthsToPay = elapsedMonths(0);
        require (monthsToPay > 0, "No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }

    function teamLiquidity()public payable{
        string memory role = "liquidity";
        require(roles[role] == msg.sender, "Invalid caller");
        require(tokenAllowance[msg.sender] > 0, "Payments already Completed");
        require(remainingInstallments[msg.sender] > 0, "installments completed");

        distributeInstallment(msg.sender,remainingInstallments[msg.sender]);
    }

    function teamDevelopment()public payable{
        string memory role = "development";
        require(roles[role] == msg.sender, "Invalid caller");
        require(tokenAllowance[msg.sender] > 0, "Payments already Completed");
        require(remainingInstallments[msg.sender] > 0, "installments completed");
        uint256 monthsToPay = elapsedMonths(0);
        require (monthsToPay > 0, "No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }

    function teamFunds()public payable{
        string memory role = "ecosystemFunds";
        require(roles[role] == msg.sender, "Invalid caller");
        require(tokenAllowance[msg.sender] > 0, "Payments already Completed");
        require(remainingInstallments[msg.sender] > 0, "installments completed");
        uint256 monthsToPay = elapsedMonths(0);
        require (monthsToPay > 0, "No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }


    function teamTokenSale()public payable{
        string memory role = "tokenSale";
        require(roles[role] == msg.sender, "Invalid caller");
        require(tokenAllowance[msg.sender] > 0, "Payments already Completed");
        require(remainingInstallments[msg.sender] > 0, "installments completed");

        distributeInstallment(msg.sender,remainingInstallments[msg.sender]);
    }

    function teamAirDrop()public payable{
        string memory role = "ecosystemFunds";
        require(roles[role] == msg.sender, "Invalid caller");
        require(tokenAllowance[msg.sender] > 0, "Payments already Completed");
        require(remainingInstallments[msg.sender] > 0, "installments completed");
        uint256 monthsToPay = elapsedMonths(0);
        require (monthsToPay > 0, "No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }

    function teamGrants()public payable{
        string memory role = "ecosystemFunds";
        require(roles[role] == msg.sender, "Invalid caller");
        require(tokenAllowance[msg.sender] > 0, "Payments already Completed");
        require(remainingInstallments[msg.sender] > 0, "installments completed");
        uint256 monthsToPay = elapsedMonths(3); // 3 months lockout period
        require (monthsToPay > 0, "No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }

    function floxyTransfer(uint256 amountDue,address recepient) internal{
            tokenAllowance[recepient] = tokenAllowance[recepient].sub(amountDue);
            floyx.transfer(recepient,amountDue);
            emit FundsReleased(recepient, amountDue);
    }
  
    function percentage(uint256 totalAmount_,uint256 _percentage) public pure returns(uint256) {
        return (totalAmount_.mul(_percentage).div(100));
    }

    function elapsedMonths(uint256 _lockPeriod) public view returns(uint256) {
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