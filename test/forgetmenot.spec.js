const Forgetmenot = artifacts.require("Forgetmenot");

contract('Forgetmenot Basics', async (accounts) => {

  var entryZeroCreatedBlock = 0;

  function assertEventOfType (response, eventName, index) {
    assert.equal(response.logs[index].event, eventName, eventName + ' event should fire.');
  }


  it("should able to create a contract", async () => {
    let instance = await Forgetmenot.deployed();

    await instance.createEntry("name", "paul", { from: accounts[0] });
    var entry = await instance.fetchEntry({ from: accounts[0] });

    entryZeroCreatedBlock = entry.valueOf()[2];
    console.log(`entryZeroCreatedBlock: ${entryZeroCreatedBlock}`);

    assert.equal(entry.valueOf()[0], "name");
    assert.equal(entry.valueOf()[1], "paul");
    assert.equal(entry.valueOf()[3], 0);
  })

  it("should update link to index", async () => {
    let instance = await Forgetmenot.deployed();

    await instance.createEntry("surname", "zietsman", { from: accounts[0] });
    var entry = await instance.fetchEntry({ from: accounts[0] });

    assert.equal(entry.valueOf()[0], "surname");
    assert.equal(entry.valueOf()[1], "zietsman");
    assert.equal(entry.valueOf()[3].valueOf(), entryZeroCreatedBlock.valueOf());
  })

  it("should emit LogNewEntry", async () => {
    let instance = await Forgetmenot.deployed();
    var event = await instance.createEntry("name", "paul", { from: accounts[0] });

    assertEventOfType(event, "LogNewEntry", 0);
  })

})