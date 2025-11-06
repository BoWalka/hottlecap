const CONTRACT_ADDRESS = "0xCc50C613532ebCabD0978D10aF2B35cb17cC9300"; // Your new deploy
const ABI = [
  "function mint() payable",
  "function burn(uint256 amount)",
  "function balanceOf(address) view returns (uint256)",
  "function totalEthDeposited() view returns (uint256)"
];

let provider, signer, contract, userAddress;

document.getElementById('connect').onclick = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      userAddress = await signer.getAddress();
      contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      document.getElementById('connect').style.display = 'none';
      document.getElementById('mintSection').style.display = 'block';
      updateBalance();
      updatePool();
    } catch (error) {
      document.getElementById('status').innerText = 'Connection failed: ' + error.message;
    }
  } else {
    document.getElementById('status').innerText = 'MetaMask not detected—install it, boss';
  }
};

document.getElementById('mint').onclick = async () => {
  const ethAmount = ethers.parseEther(document.getElementById('amount').value || '0');
  if (ethAmount === 0n) return;
  try {
    const tx = await contract.mint({ value: ethAmount, gasLimit: 200000 });
    await tx.wait();
    updateBalance();
    updatePool();
    document.getElementById('status').innerText = 'Minted HOTT successfully!';
  } catch (error) {
    document.getElementById('status').innerText = 'Mint failed: ' + error.message;
  }
};

document.getElementById('burn').onclick = async () => {
  const hottAmount = ethers.parseEther(document.getElementById('burnAmount').value || '0');
  if (hottAmount === 0n) return;
  try {
    const tx = await contract.burn(hottAmount);
    await tx.wait();
    updateBalance();
    document.getElementById('status').innerText = 'Burned HOTT clean!';
  } catch (error) {
    document.getElementById('status').innerText = 'Burn failed: ' + error.message;
  }
};

async function updateBalance() {
  if (!userAddress || !contract) return;
  const balance = await contract.balanceOf(userAddress);
  document.getElementById('balance').innerText = `Balance: ${ethers.formatEther(balance)} HOTT`;
}

async function updatePool() {
  if (!contract) return;
  const pool = await contract.totalEthDeposited();
  document.getElementById('pool').innerHTML = `Pool: ${ethers.formatEther(pool)} ETH`;
}