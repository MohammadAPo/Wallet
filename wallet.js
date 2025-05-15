
import { ethers } from 'ethers';
import bip39 from 'bip39';
import hdkey from 'ethereumjs-wallet/hdkey';

export function generateMnemonic() {
  return bip39.generateMnemonic();
}

export async function getWalletsWithBalance(mnemonic) {
  const wallets = [];

  const seed = await bip39.mnemonicToSeed(mnemonic);

  // Ethereum (BNB and ETH can share derivation path)
  const ethPath = "m/44'/60'/0'/0/0";
  const hdwallet = hdkey.fromMasterSeed(seed);
  const wallet = hdwallet.derivePath(ethPath).getWallet();
  const address = "0x" + wallet.getAddress().toString('hex');

  const ethBalance = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=YOUR_ETHERSCAN_API`)
    .then(res => res.json())
    .then(json => parseFloat(json.result) / 1e18);

  wallets.push({ network: 'Ethereum/BNB', address, balance: ethBalance });

  // Add mock Tron and Solana (normally need custom libs)
  wallets.push({ network: 'Tron', address: 'TRON_SUPPORT_NOT_YET', balance: 'N/A' });
  wallets.push({ network: 'Solana', address: 'SOLANA_SUPPORT_NOT_YET', balance: 'N/A' });

  return wallets;
}
