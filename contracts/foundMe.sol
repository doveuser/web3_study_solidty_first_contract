// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
 import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
error foundFailWithMoreEth();
error foundFailWithTime();
error getFoundFailWithNoReach();
error founded();
error NotOwner();
error TimeOver();
error TXFailed();
error reFoundFailWithReach();
error reFoundWithNoBalance();
contract foundMe {
    //众筹合约
    // 1. 创建一个收款函数
    // 2. 记录投资人并且查看
    // 3. 在锁定期内，达到目标值，生产商可以提款
    // 4. 在锁定期内，没有达到目标值，投资人在锁定期以后退款

    mapping(address => uint) private founderTomount; //投资人记录
    address[] private founders; //投资人
    uint256 private constant targetMoney=60*1e18; //目标资金  100eth
    address private immutable i_owner; 
    uint256 private constant min_value = 1*1e18; //单次捐款最小金额 eth
    uint256 private immutable lockTime;  //锁定时间 单位秒
    uint256 private immutable startTime; //开始时间
    bool private foundStatus = false; //提款状态
    AggregatorV3Interface private priceFeed=AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306); //
    event txSucces(address,uint256);
    constructor(uint256 _lockTime) {
        i_owner = msg.sender;
        lockTime = _lockTime;
        startTime = block.timestamp;
    }

    function found() external payable {
        //收款捐赠
        // require(getRate(msg.value)>= min_value, "please send more eth");
        // require(msg.value>= min_value, "please send more eth");//这里不使用usd转化，方便比较理解
        if(msg.value< min_value){//使用自定义错误更节省gas
            revert foundFailWithMoreEth();
        }
        if(block.timestamp >=startTime + lockTime){
            revert foundFailWithTime();
        }
        // require(block.timestamp < startTime + lockTime, "time is expired");
        founderTomount[msg.sender] = msg.value;
        founders.push(msg.sender);
    }

    function getFound() external onlyOnwer timeOver {
        //提款
        // require(address(this).balance >= targetMoney, "target not reached");
        if(address(this).balance < targetMoney){
            revert getFoundFailWithNoReach();
        }
        if(foundStatus){
            revert founded();
        }
        // require(!foundStatus, "you had founded");
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");

        // require(success, "transaction is failed");
        if(!success){
            revert TXFailed();
        }
        address[] memory arr=founders;
        uint256  foundersLen=arr.length;
        for(uint256 i=0;i<foundersLen;i++){//账户归零
            address each=arr[i];
            founderTomount[each]=0;
        }
        founders=new address[](0);
        foundStatus = true;
    }

    function getBalancOfAddr(address addr) external view returns (uint256) {
        //根据账户查询捐款金额
        return founderTomount[addr];
    }

    function reFound() external timeOver {
        //退款
        // require(address(this).balance < targetMoney, "target is not reached");
        // require(founderTomount[msg.sender]>0,"you have no balance");
        if(address(this).balance >= targetMoney){
            revert reFoundFailWithReach();
        }
         uint256  currentBalance=founderTomount[msg.sender];
        if(currentBalance<=0){
            revert reFoundWithNoBalance();
        }
       
        (bool success, ) = payable(msg.sender).call{
            value: currentBalance
        }("");
        // require(success, "transaction is failed");
        if(!success){
            revert TXFailed();
        }
        founderTomount[msg.sender] = 0;
        uint256 foundersLen=founders.length;
        for(uint256 i=0;i<foundersLen;i++){
            address eachFounder=founders[i];
            if(eachFounder==msg.sender){
                    founders[i]=founders[founders.length-1];
                    founders.pop();
                    break;
            }
        }
        emit txSucces(msg.sender,currentBalance);
    }

    modifier onlyOnwer() {
        //权限控制 只有合约部署者
        // require(msg.sender == i_owner, "you are not owner");
        if(msg.sender!=i_owner){
            revert NotOwner();
        }
        _;
    }
    modifier timeOver() {
        //时间控制
        // require(, "time is over");
        if(block.timestamp <= startTime + lockTime){
            revert TimeOver();
        }
        _;
    }
    function getFounders() external view returns(address[] memory){
        return founders;
    }
    function getTargetMoney() external pure returns(uint256){
        return targetMoney;
    }
    function getPrice() internal pure  returns(uint256){
            // (,int256 price,,,)=priceFeed.latestRoundData(); //1eth与美元的价格比例 1eth : 3000*10*8
            int256 price =3000*10**8;
            return uint256(price*1e10); //这里转化为1wei对应的美元价格   10*18 wei :3000*10**18   合约程序中默认都是wei单位
    }
    function getRate(uint256 amount) internal pure  returns(uint256){ //计算传入的eth对应的美元价格 amount单位eth
        uint256 price=getPrice();
        uint256 ethPrice=(amount*price)/1e18;
        return ethPrice;
    }
    function getBalance() external view returns(uint256){
        return address(this).balance;
    }
    function getOwner() external view returns(address){
        return i_owner;
    }
    function getStartTime() external view returns(uint256){
        return startTime;
    }
    function getLockTime() external view returns(uint256){
        return lockTime;
    }
}
