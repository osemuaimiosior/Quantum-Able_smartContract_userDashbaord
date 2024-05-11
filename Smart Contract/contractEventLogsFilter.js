var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider(/*node provider http link*/));

const filter = web3.eth.filter({
    fromBlock: 0,
    toBlock: 'latest',
    address: contractAddress,
   topics: [web3.sha3(/*the event you want to filter*/)]
  })
  
  filter.watch((error, result) => {
     //
  })