const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const {interface, bytecode} = require('./compile');


// Create a provider
const provider = new HDWalletProvider(
    'soldier question general speak satisfy enough ticket office song blind today banana',
    'https://sepolia.infura.io/v3/f1f3e03349d54277ba8a37d2ca89106f'
);

// Sending the provider to web3
const web3 = new Web3(provider);

// deploy
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to deploy from account', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments:['Hi there!'] })
        .send({ gas:'1000000', from: accounts[0]});

    console.log('Contract deployed to', result.options.address);

    provider.engine.stop();
};

deploy();
