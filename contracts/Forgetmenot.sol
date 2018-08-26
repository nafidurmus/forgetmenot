pragma solidity ^0.4.17;

contract Forgetmenot {

	struct Entry {
		string key;
		string value;
		uint createdBlock;
		uint linkToPreviousBlock;
	}

	event LogNewEntry (address _address);

	mapping (address => Entry) private addressToEntryMapping; 

	function createEntry (string _key, string _value) public {

		Entry storage entry = addressToEntryMapping[msg.sender];
		entry.linkToPreviousBlock = entry.createdBlock;
		entry.createdBlock = block.number;

		entry.key = _key;
		entry.value = _value;

		emit LogNewEntry(msg.sender);
	} 

	function fetchEntry () public view returns (string, string, uint, uint) {
		return (
			addressToEntryMapping[msg.sender].key, 
			addressToEntryMapping[msg.sender].value, 
			addressToEntryMapping[msg.sender].createdBlock, 
			addressToEntryMapping[msg.sender].linkToPreviousBlock
		);
	} 
}