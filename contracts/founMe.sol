// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract foundMe {
    //众筹合约
    // 1. 创建一个收款函数
    // 2. 记录投资人并且查看
    // 3. 在锁定期内，达到目标值，生产商可以提款
    // 4. 在锁定期内，没有达到目标值，投资人在锁定期以后退款

    mapping(address => uint) founderTomount; //投资人记录
    uint256 public targetMoney; //目标资金
    address private owner;
    uint256 private min_value = 100; //单次捐款最小金额
    uint256 lockTime; //锁定时间 单位秒
    uint256 startTime; //开始时间

    constructor(uint256 _lockTime) {
        owner = msg.sender;
        lockTime = _lockTime;
        startTime = block.timestamp;
    }

    function found() external payable {
        //收款捐赠
        require(block.timestamp < startTime + lockTime, "time is expired");
        require(msg.value >= min_value, "please send more eth");

        founderTomount[msg.sender] = msg.value;
    }

    function getFound() external view onlyOnwer {
        //提款
        require(address(this).balance >= targetMoney, "target not reached");
    }

    function getBalancOfAddr(address addr) public view returns (uint256) {
        //根据账户查询捐款金额
        return founderTomount[addr];
    }

    function reFound() public {}

    modifier onlyOnwer() {
        //权限控制 只有合约部署者
        require(msg.sender == owner, "you are not owner");
        _;
    }
}
