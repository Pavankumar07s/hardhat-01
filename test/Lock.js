const { assert, expect } = require("chai");
describe("SimpleStorage", () => {
  let SimpleStorage;
  let Lock;
  beforeEach(async () => {
    Lock = await ethers.getContractFactory("SimpleStorage");
    SimpleStorage = await Lock.deploy();
    await SimpleStorage.deploymentTransaction().wait();
  });
  it("should tart from fav number", async () => {
    const currentValue = await SimpleStorage.retrieve();
    const expectedValue = 0;

    assert.equal(expectedValue, currentValue.toString());
  });

  it("it should update the fav number to 7", async () => {
    const transectionResponce = await SimpleStorage.store(7);
    await transectionResponce.wait(1);
    const updatedValue = await SimpleStorage.retrieve();
    const expectedValue = 7;
    assert.equal(expectedValue, updatedValue.toString());
  });
});
