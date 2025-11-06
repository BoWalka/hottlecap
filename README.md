# Hottlecap dApp

A decentralized application (dApp) for minting Hottlecap ERC-20 tokens by depositing ETH. Built with Hardhat, Solidity, and a simple frontend.

## Features

- Mint HOTT tokens by sending ETH (1000 HOTT per ETH)
- Owner can withdraw collected ETH
- Owner can airdrop tokens
- Burn tokens
- Basic frontend for interaction

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask or another Web3 wallet
- Sepolia testnet ETH for deployment and testing

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/hottlecap-dapp.git
   cd hottlecap-dapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Fill in your Alchemy Sepolia URL, private key, and Etherscan API key
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. **Compile the contracts:**
   ```bash
   npm run compile
   ```

5. **Run tests:**
   ```bash
   npm run test
   ```

6. **Deploy to Sepolia:**
   ```bash
   npm run deploy
   ```
   Note the deployed contract address from the output.

7. **Update frontend:**
   - Edit `public/index.html` and replace `contractAddress` with your deployed address.

8. **Serve the frontend:**
   ```bash
   npm run serve
   ```
   Open http://localhost:8080 in your browser.

## Usage

- Connect your wallet
- Enter ETH amount (minimum 0.001) and mint tokens
- View your token balance
- Owner can withdraw ETH from the contract

## Project Structure

- `contracts/`: Solidity contracts
- `scripts/`: Deployment scripts
- `test/`: Test files
- `public/`: Frontend files

## License

MIT