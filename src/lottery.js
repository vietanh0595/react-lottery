import web3 from "./web3";

const address = '0x7241102b30564CeE2927AbD7F75700DAC77a69bb';
const abi = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
      inputs: [],
      name: 'enter',
      outputs: [],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getPlayers',
      outputs: [Array],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'manager',
      outputs: [Array],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'pickWinner',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [Array],
      name: 'players',
      outputs: [Array],
      stateMutability: 'view',
      type: 'function'
    }
  ];

  export default new web3.eth.Contract(abi, address);