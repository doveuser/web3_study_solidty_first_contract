// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
 import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
contract foundMe {
    //众筹合约
    // 1. 创建一个收款函数
    // 2. 记录投资人并且查看
    // 3. 在锁定期内，达到目标值，生产商可以提款
    // 4. 在锁定期内，没有达到目标值，投资人在锁定期以后退款

    mapping(address => uint) founderTomount; //投资人记录
    address[] private founders; //投资人
    uint256 private targetMoney=50*1e18; //目标资金  100eth
    address public owner; 
    uint256 private min_value = 50*1e18; //单次捐款最小金额 eth
    uint256 public lockTime;  //锁定时间 单位秒
    uint256 startTime; //开始时间
    bool foundStatus = false; //提款状态
    AggregatorV3Interface private priceFeed=AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306); //
  
    constructor(uint256 _lockTime) {
        owner = msg.sender;
        lockTime = _lockTime;
        startTime = block.timestamp;
    }

    function found() external payable {
        //收款捐赠
        // require(getRate(msg.value)>= min_value, "please send more eth");
        require(msg.value>= min_value, "please send more eth");//这里不使用usd转化，方便比较理解
        
        require(block.timestamp < startTime + lockTime, "time is expired");
        founderTomount[msg.sender] = msg.value;
        founders.push(msg.sender);
    }

    function getFound() external onlyOnwer timeOver {
        //提款
        require(address(this).balance >= targetMoney, "target not reached");
        require(!foundStatus, "you had founded");
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success, "transaction is failed");
        for(uint256 i=0;i<founders.length;i++){//账户归零
            founderTomount[founders[i]]=0;
        }
        founders=new address[](0);
        foundStatus = true;
    }

    function getBalancOfAddr(address addr) public view returns (uint256) {
        //根据账户查询捐款金额
        return founderTomount[addr];
    }

    function reFound() external timeOver {
        //退款
        (bool success, ) = payable(msg.sender).call{
            value: founderTomount[msg.sender]
        }("");
        require(success, "transaction is failed");
        founderTomount[msg.sender] = 0;
        for(uint256 i=0;i<founders.length;i++){
            if(founders[i]==msg.sender){
                    founders[i]=founders[founders.length];
                    break;
            }
        }
        founders.pop();
        
    }

    modifier onlyOnwer() {
        //权限控制 只有合约部署者
        require(msg.sender == owner, "you are not owner");
        _;
    }
    modifier timeOver() {
        //时间控制
        require(block.timestamp > startTime + lockTime, "time is over");
        _;
    }
    function getFounders() public view returns(address[] memory){
        return founders;
    }
    function getTargetMoney() public view returns(uint256){
        return targetMoney;
    }
    function getPrice() internal pure  returns(uint256){
            // (,int256 price,,,)=priceFeed.latestRoundData(); //1eth与美元的价格比例 1eth : 3000*10*8
            int256 price =3000*10**8;

            return uint256(price*1e10); //这里转化为1wei对应的美元价格   10*18 wei :3000*10**18   合约程序中默认都是wei单位
    }
    function getRate(uint256 amount) public pure  returns(uint256){ //计算传入的eth对应的美元价格 amount单位eth
        uint256 price=getPrice();
        uint256 ethPrice=(amount*price)/1e18;
        return ethPrice;
    }
}
