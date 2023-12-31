import { ethers } from "hardhat";

const provider = new ethers.JsonRpcProvider()
const abiCoder = new ethers.AbiCoder();
console.log("ethers version: ", ethers.version);

async function main() {
  const MyContract = await ethers.getContractFactory("Storage");

  console.log("Deploy contract...");
  const myContract = await MyContract.deploy();

  console.log("Contract address:", myContract.target);

  await myContract.foo();

  console.log("\n", "Get storage main slot...");
  for (let i = 0; i < 24; i ++) {
    await getSlotStorage(myContract.target as string, i);
  }

  // 编码和哈希示例
  // const encodedData = abiCoder.encode(["uint256"], [11]);
  // console.log("encodedData: ", encodedData);
  // const hash = ethers.keccak256(encodedData);
  // console.log("hash: ", hash);

  console.log("\n", "Get storage sub slot...");

  console.log("\n", "String storage...");
  let slot_hash = ethers.keccak256(abiCoder.encode(["uint256"], [14])) //计算14槽位的哈希
  await getSlotStorage(myContract.target as string, slot_hash);

  slot_hash = ethers.keccak256(abiCoder.encode(["uint256"], [15])) //计算15槽位的哈希
  await getSlotStorage(myContract.target as string, slot_hash);

  slot_hash = ethers.toBeHex((BigInt(slot_hash) + BigInt(1))) //哈希+1
  await getSlotStorage(myContract.target as string, slot_hash);

  console.log("\n", "Mapping storage...");
  slot_hash = ethers.keccak256(abiCoder.encode(["uint256", "uint256"], [0 , 16]))
  await getSlotStorage(myContract.target as string, slot_hash);

  slot_hash = ethers.keccak256(abiCoder.encode(["uint256", "uint256"], [1 , 16]))
  await getSlotStorage(myContract.target as string, slot_hash);
  
  slot_hash = ethers.keccak256(abiCoder.encode(["uint256", "uint256"], [2 , 16]))
  await getSlotStorage(myContract.target as string, slot_hash);  

  console.log("\n", "Dynamic_Array storage...");
  slot_hash = ethers.keccak256(abiCoder.encode(["uint256"], [17])) //计算15槽位的哈希
  await getSlotStorage(myContract.target as string, slot_hash);  

  slot_hash = ethers.toBeHex((BigInt(slot_hash) + BigInt(1))) //哈希+1
  await getSlotStorage(myContract.target as string, slot_hash);  

  console.log("\n", "Mapping_Array storage...");
  slot_hash = ethers.keccak256(abiCoder.encode(["uint256", "uint256"], [0 , 18]))
  await getSlotStorage(myContract.target as string, slot_hash);

  slot_hash = ethers.keccak256(abiCoder.encode(["uint256"], [slot_hash]))
  await getSlotStorage(myContract.target as string, slot_hash);

  slot_hash = ethers.keccak256(abiCoder.encode(["uint256", "uint256"], [1 , 18]))
  await getSlotStorage(myContract.target as string, slot_hash);

  slot_hash = ethers.keccak256(abiCoder.encode(["uint256"], [slot_hash]))
  await getSlotStorage(myContract.target as string, slot_hash);
  
  slot_hash = ethers.toBeHex((BigInt(slot_hash) + BigInt(1))) //哈希+1
  await getSlotStorage(myContract.target as string, slot_hash);    
  
  slot_hash = ethers.keccak256(abiCoder.encode(["uint256", "uint256"], [2 , 18]))
  await getSlotStorage(myContract.target as string, slot_hash);  

  slot_hash = ethers.keccak256(abiCoder.encode(["uint256"], [slot_hash]))
  await getSlotStorage(myContract.target as string, slot_hash);

  slot_hash = ethers.toBeHex((BigInt(slot_hash) + BigInt(1))) //哈希+1
  await getSlotStorage(myContract.target as string, slot_hash);    
  
  slot_hash = ethers.toBeHex((BigInt(slot_hash) + BigInt(1))) //哈希+1
  await getSlotStorage(myContract.target as string, slot_hash);

  console.log("\n", "Struct storage...");
  slot_hash = ethers.keccak256(abiCoder.encode(["uint256"], [21]))
  await getSlotStorage(myContract.target as string, slot_hash);
  
  slot_hash = ethers.toBeHex((BigInt(slot_hash) + BigInt(1))) //哈希+1
  await getSlotStorage(myContract.target as string, slot_hash);
}

async function getSlotStorage(contract_address:string, slot_number:number) {
  let SlotStorage = await provider.getStorage(contract_address, slot_number)
  console.log("slot", slot_number.toString().padStart(3, '0'), SlotStorage)
  return SlotStorage
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
