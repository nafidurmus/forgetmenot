pragma solidity ^0.4.17;

contract ForgetmenotArray {

	struct Entry {
		string key;
		string value;
	}

	mapping (address => Entry[]) private addressToEntryMapping; 

	function createEntry (string _key, string _value) public {
		addressToEntryMapping[msg.sender].push(Entry(_key, _value));
	} 

	function fetchEntry (uint _index) public view returns (string, string) {
		return (
			addressToEntryMapping[msg.sender][_index].key, 
			addressToEntryMapping[msg.sender][_index].value
		);
	}
}