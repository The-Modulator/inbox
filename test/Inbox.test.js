const assert = require ('assert');
const { log } = require('console');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());
const {interface,bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of accounts - ganach
   accounts = await web3.eth.getAccounts()
        
    // Use one of those accounts to deploy

   inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hi there!']})
        .send({ from: accounts[0], gas: '1000000' })
});


describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log(inbox);
    });
});
