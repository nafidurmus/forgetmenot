# forgetmenot

## requirements to run this
* A browser with metamask (Chrome, Firefox or Brave)
* NodeJS
* Truffle globally installed (`npm install -g truffle`)

## building and deploying to contract
1. Install the dependencies to run demo 
	>`npm install`

2. Open a console with a local development blockchain
	>`truffle develop`
	
	The address we will be using is: **0x627306090abab3a6e1400e9345bc60c78a8bef57**
	and the private key: **c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3**

3. Deploy the smart contract by the following commands in the *truffle development console*
	> **truffle(develop)>** `compile`  
	> Compiling .\contracts\Forgetmenot.sol...  
	> Compiling .\contracts\Migrations.sol...  
	> Writing artifacts to .\build\contracts  
	>  
	> **truffle(develop)>** `migrate`  
	> Using network 'develop'.  
	>   
	> Running migration: 1_initial_migration.js  
	>   Deploying Migrations...  
	>   ... 0x4f55d85f9b2e2e3149d70ab4848e713e796f0744f6606b7051e423f4903e5838  
	>   Migrations: 0x8cdaf0cd259887258bc13a92c0a6da92698644c0  
	> Saving successful migration to network...  
	>   ... 0xd7bc86d31bee32fa3988f1c1eabce403a1b5d570340a3a9cdba53a472ee8c956  
	> Saving artifacts...  
	> Running migration: 2_forgetmenot.js  
	>   Deploying Forgetmenot...  
	>   ... 0xdcf2271f20f8bc32295f399154d7853e410173a920bad6d232e38918a3ffd644  
	>   Forgetmenot: 0x345ca3e014aaf5dca488057592ee47305d9b3e10  
	> Saving successful migration to network...  
	>   ... 0xf36163615f41ef7ed8f4a8f192149a0bf633fe1a2398ce001bf44c43dc7bdda0  
	> Saving artifacts...  

4. Open another console window

5. Start the web-server
	> `npm start`

## test drive

