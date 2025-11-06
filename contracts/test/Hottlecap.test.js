const { expect } = require("chai");

describe("Hottlecap", function () {
  let Hottlecap, hottlecap, owner, addr1;

  beforeEach(async function () {
    Hottlecap = await ethers.getContractFactory("Hottlecap");
    [owner, addr1] = await ethers.getSigners();
    hottlecap = await Hottlecap.deploy();
  });

  it("Mints to owner", async function () {
    const mintAmount = ethers.parseEther("1000");
    await hottlecap.mint(owner.address, mintAmount);
    expect(await hottlecap.balanceOf(owner.address)).to.equal(mintAmount);
  });

  it("Reverts mint from non-owner", async function () {
    await expect(hottlecap.connect(addr1).mint(addr1.address, 1000)).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Burns from caller", async function () {
    const mintAmount = ethers.parseEther("1000");
    await hottlecap.mint(owner.address, mintAmount);
    await hottlecap.burn(mintAmount);
    expect(await hottlecap.balanceOf(owner.address)).to.equal(0);
  });
});
