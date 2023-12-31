// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Storage {

    //固定长度类型
    bool    public var1 = true; //Slot0

    uint256 public var2 = 2;    //Slot1
    uint256 public var3 = 3;    //Slot2

    uint128 public var4 = 4;    //Slot3
    uint128 public var5 = 5;    //Slot3
    
    uint128 public var6 = 6;    //Slot4
    uint256 public var7 = 7;    //Slot5
    uint128 public var8 = 8;    //Slot6

    address public addr     = 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853;                         //Slot7
    bytes32 public bytes_32 = 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef; //Slot8

    uint256[3] public array = [10, 11, 12]; //Slot9 ~ Slot11

    //非固定长度类型
    string public str1 = 'abcabcabcabc';                      //Slot12, 存在1个槽内, 最后一个字节存储长度        
    string public str2 = 'abcabcabcabcabcabcabcabcabcabca';   //Slot13, 存在1个槽内, 最后一个字节存储长度
    string public str3 = 'defdefdefdefdefdefdefdefdefdefde';  //主槽Slot14, 子槽槽位keccak256(abi.encode(14))，存在2个槽内, 1个主槽存储长度, 1个子槽存储数据
    string public str4 = 'fghfghfghfghfghfghfghfghfghfghfgijkijkijkijkijkijkijkijkijkijkij';  //主槽Slot15，子槽槽位keccak256(abi.encode(15)), 存在3个槽内, 1个主槽存储长度, 2个子槽存储数据，子槽不够继续往下存储。

    mapping(uint256 => uint256) public mapping_var; //主槽Slot16，主槽空置，不存储内容; 子槽存储数据，子槽槽位 keccak256(abi.encode(key, slot)) 中

    uint256[] public dynamic_array; //主槽Slot17, 主槽存储数组长度，子槽存储数据，子槽槽位keccak256(slot)，子槽不够继续往下存储。

    //组合长度类型
    mapping(uint256 => uint256[]) public mapping_array; //主槽Slot18, 主槽空置，不存储内容; 一级子槽存储数组长度，子槽槽位 keccak256(abi.encode(key, slot)) 中，二级子槽存储数组内容。

    struct UserInfo {
        string name;
        uint128 age;
        uint128 weight;
        uint256[] orders;
        uint64[4] lastLogins;
    }

    UserInfo public user; //主槽Slot19

    function foo() public {
        mapping_var[0] = 0xaa; //主槽Slot16, 子槽槽位keccak256(abi.encode(0, 16))
        mapping_var[1] = 0xbb; //主槽Slot16, 子槽槽位keccak256(abi.encode(1, 16))
        mapping_var[2] = 0xcc; //主槽Slot16, 子槽槽位keccak256(abi.encode(2, 16))

        dynamic_array.push(0xabc); //主槽Slot17, 子槽槽位keccak256(abi.encode(17))开始
        dynamic_array.push(0xdef); //主槽Slot17, 子槽槽位keccak256(abi.encode(17))开始

        mapping_array[0] = [0xaaa];
        mapping_array[1] = [0xbbb,0xccc];
        mapping_array[2] = [0xddd,0xeee,0xfff];

        user = UserInfo({
           name: "sandy",
           age:0xaa,
           weight:0xbb,
           orders:new uint256[](2),
           lastLogins:[uint64(0xee), 0xff, 0xfe, 0xef]
       });
        user.orders[0] = 0xcc;
        user.orders[1] = 0xdd;
    }
}