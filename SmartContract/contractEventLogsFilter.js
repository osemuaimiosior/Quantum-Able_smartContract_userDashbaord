require('dotenv').config();
const ethers = require('ethers');

const addr = "0x751E47217f1e587B65Df8587B6D277bC73d19207";
const abi = require('./abi.json');

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.TESTNET_URL)
  const wallet = new ethers.Wallet(process.env.KEY, provider)
  const signer = wallet.provider.getSigner(wallet.address);
  const Contract = new ethers.Contract(addr, abi, provider);

  Contract.on('transferEvent', (to, value, event) =>{
    let info ={
      acc: to,
      value: ethers.utils.formatUnits(value),
      data: event,
    };
    console.log(JSON.stringify(info));
  })
}
main();


