			// SPDX-License-Identifier: MIT
			pragma solidity ^0.8.24;

			import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
			import "@openzeppelin/contracts/access/Ownable.sol";

			contract Hottlecap is ERC20, Ownable {
				uint256 private constant MINT_RATE = 1000 * 10**18;
				uint256 private constant MIN_ETH_DEPOSIT = 0.001 ether;
				uint256 public totalEthDeposited;

				event Deployed(address indexed owner, string name, string symbol);
				event TokensMinted(address indexed to, uint256 ethAmount, uint256 tokenAmount);
				event EthWithdrawn(address indexed to, uint256 amount);

				constructor() ERC20("hottlecap", "HOTT") Ownable(msg.sender) payable {
					emit Deployed(msg.sender, name(), symbol());
				}

				function mint() public payable {
					require(msg.sender != address(0), "Invalid zero sender");
					require(msg.value >= MIN_ETH_DEPOSIT, "Deposit too low");
					uint256 tokenAmount = (msg.value * MINT_RATE) / 1 ether;
					_mint(msg.sender, tokenAmount);
					totalEthDeposited = totalEthDeposited + msg.value;
					emit TokensMinted(msg.sender, msg.value, tokenAmount);
				}

				function airdropMint(address to, uint256 amount) public onlyOwner returns (bool) {
					require(to != address(0), "Invalid zero address");
					_mint(to, amount);
					return true;
				}

				function burn(uint256 amount) public {
					_burn(msg.sender, amount);
				}

				function withdrawEth() public onlyOwner {
					uint256 balance = address(this).balance;
					require(balance > 0, "No funds to withdraw");
					totalEthDeposited = 0;
					(bool success, ) = payable(owner()).call{value: balance}("");
					require(success, "Withdraw failed");
					emit EthWithdrawn(owner(), balance);
				}

				receive() external payable {
					mint();
				}
			}