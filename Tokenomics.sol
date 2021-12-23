// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SafeMath.sol";
import "./IERC20.sol";
import "./Ownable.sol";

contract FloyxTokenomics is Ownable{

    using SafeMath for uint256;

    string private constant TEAM_ROLE = "TEAM_ROLE";
    string private constant ADVISOR_ROLE = "ADVISOR_ROLE";
    string private constant MARKETING_ROLE = "MARKETING_ROLE";
    string private constant LIQUIDITY_ROLE = "LIQUIDITY_ROLE";
    string private constant DEVELOPMENT_ROLE = "DEVELOPMENT_ROLE";
    string private constant ECOSYSTEM_ROLE = "ECOSYSTEM_ROLE";
    string private constant TOKENSALE_ROLE = "TOKENSALE_ROLE";
    string private constant AIRDROP_ROLE = "AIRDROP_ROLE";
    string private constant GRANTS_ROLE = "GRANTS_ROLE";

    uint256 public constant unixtimeOneMonth = 60;//2592000; //60*60*24*30
    bool public lockClaim = false;
    uint256 public deployedTime;

    IERC20 internal floyx;

    mapping(string => address)public roles;
    mapping(address => uint256)public tokenAllowance;
    mapping(address => uint256) public paymentPerMonth;
    mapping(address => uint) public remainingInstallments;
    mapping(address => uint) public completedInstallments;

    event FundsReleased(address indexed recepient, uint256 amount);

    constructor(string[] memory roles_, address[] memory addresses_, uint256[] memory allowancePercentage_, 
        uint256[] memory installmentPercentage_, address floyxAddress){

        require(addresses_.length == roles_.length);

        deployedTime = block.timestamp;
        floyx = IERC20(floyxAddress);
        uint256 totalSupply = floyx.totalSupply();

        for (uint8 i=0; i< addresses_.length; i++){

            roles[roles_[i]] = addresses_[i];
            tokenAllowance[addresses_[i]] = _percentage(totalSupply, allowancePercentage_[i]) ; // total supply percentage
            paymentPerMonth[addresses_[i]] = _percentage(tokenAllowance[addresses_[i]], installmentPercentage_[i]); // installments of supply
            remainingInstallments[addresses_[i]] =  tokenAllowance[addresses_[i]].div(paymentPerMonth[addresses_[i]]);
        }
    }

    function lockClaims() public onlyOwner {
        lockClaim = true;
    }

    function unlockClaims() public onlyOwner {
        lockClaim = false;
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
            _floxyTransfer(amountDue,recepient);
        }
    }

    function teamClaim()public{
        _verifyClaim(TEAM_ROLE, msg.sender);
        uint256 monthsToPay = _elapsedMonths(0);
        require (monthsToPay > 0, "Floyx Tokenomics : No due Payments yet");
        distributeInstallment(msg.sender,monthsToPay);
    }

    function advisorClaim()public{
        _verifyClaim(ADVISOR_ROLE, msg.sender);
        uint256 monthsToPay = _elapsedMonths(0);
        monthsToPay = monthsToPay.div(3);
        require (monthsToPay > 0, "Floyx Tokenomics : No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }

    function marketingClaim()public{
        _verifyClaim(MARKETING_ROLE, msg.sender);
        uint256 monthsToPay = _elapsedMonths(0);
        require (monthsToPay > 0, "Floyx Tokenomics : No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }

    function liquidityClaim()public{
        _verifyClaim(LIQUIDITY_ROLE, msg.sender);

        distributeInstallment(msg.sender,remainingInstallments[msg.sender]);
    }

    function developmentClaim()public{
        _verifyClaim(DEVELOPMENT_ROLE, msg.sender);
        uint256 monthsToPay = _elapsedMonths(0);
        require (monthsToPay > 0, "Floyx Tokenomics : No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }

    function ecosystemClaim()public{
        _verifyClaim(ECOSYSTEM_ROLE, msg.sender);
        uint256 monthsToPay = _elapsedMonths(0);
        require (monthsToPay > 0, "Floyx Tokenomics : No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }


    function tokenSaleClaim()public{
        _verifyClaim(TOKENSALE_ROLE, msg.sender);

        distributeInstallment(msg.sender,remainingInstallments[msg.sender]);
    }

    function airDropClaim()public{
        _verifyClaim(AIRDROP_ROLE, msg.sender);
        uint256 monthsToPay = _elapsedMonths(0);
        require (monthsToPay > 0, "Floyx Tokenomics : No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }

    function grantsClaim()public{
        _verifyClaim(GRANTS_ROLE, msg.sender);
        uint256 monthsToPay = _elapsedMonths(3); // 3 months lockout period
        require (monthsToPay > 0, "Floyx Tokenomics : No due Payments yet");

        distributeInstallment(msg.sender,monthsToPay);
    }

    function _verifyClaim(string memory role_,address user_)internal view {
        require(lockClaim == false,"Withdraw is locked now. Please try again later");
        require(roles[role_] == user_, "Invalid caller");
        require(tokenAllowance[user_] > 0, "Floyx Tokenomics : Payments already completed");
        require(remainingInstallments[user_] > 0, "Floyx Tokenomics : installments completed");
    }

    function updateAddress(string[] memory roles_, address[] memory addresses_)public onlyOwner{
        require(addresses_.length == roles_.length);
        
        for(uint8 i = 0; i< roles_.length; i++){
            require(roles[roles_[i]] != address(0), "Floyx Tokenomics : role does not exists");
            roles[roles_[i]] = addresses_[i];
        }
    }

    function _floxyTransfer(uint256 amountDue,address recepient) internal{
            tokenAllowance[recepient] = tokenAllowance[recepient].sub(amountDue);
            floyx.transfer(recepient,amountDue);
            emit FundsReleased(recepient, amountDue);
    }
  
    function _percentage(uint256 totalAmount_,uint256 percentage_) internal pure returns(uint256) {
        return (totalAmount_.mul(percentage_).div(100));
    }

    function _elapsedMonths(uint256 _lockPeriod) internal view returns(uint256) {
        uint256 presentTime = block.timestamp;
        uint256 elapsedTime = presentTime.sub(deployedTime);
     
        uint256 unixlocktime = _lockPeriod.mul(unixtimeOneMonth);
        require(elapsedTime > unixlocktime,"Floyx Tokenomics : Lock period is active");
        elapsedTime = elapsedTime.sub(unixlocktime);
        require(elapsedTime > 0, "Floyx Tokenomics : Lock period is active");      
        uint256 elapsedMonth = elapsedTime.div(unixtimeOneMonth);
        return elapsedMonth;
    }
}