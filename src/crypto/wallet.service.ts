import { Injectable } from '@nestjs/common';
import { generateMnemonic, mnemonicToEntropy, mnemonicToSeedSync } from 'ethereum-cryptography/bip39';
import { wordlist } from 'ethereum-cryptography/bip39/wordlists/english';
import { HDKey } from 'ethereum-cryptography/hdkey';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { bytesToHex } from 'ethereum-cryptography/utils';

@Injectable()
export class WalletService {

  _generateMnemonic() {
    const strength = 128; // 256 bits, 24 words; default is 128 bits, 12 words
    const mnemonic = generateMnemonic(wordlist, strength);
    const entropy = mnemonicToEntropy(mnemonic, wordlist);
    return { mnemonic, entropy };
  }
  
  _getHdRootKey(_mnemonic) {
    const seed = mnemonicToSeedSync(_mnemonic);
    return HDKey.fromMasterSeed(seed);
  }
  
  _generatePrivateKey(_hdRootKey, _accountIndex) {
    const path = `m/44'/60'/0'/0/${_accountIndex}`;
    return _hdRootKey.derive(path).privateKey;
  }
  
  _getPublicKey(_privateKey) {
    return secp256k1.getPublicKey(_privateKey, false);
  }

  _getEthAddress(_publicKey) {
    return keccak256(_publicKey.slice(1)).slice(-20);
  }
  

  retriveAccount(entropy){
    const hdRootKey = this._getHdRootKey(entropy);
    const privateKey = this._generatePrivateKey(hdRootKey, 0);
    const publicKey = this._getPublicKey(privateKey);
    const address = this._getEthAddress(publicKey);
    return [bytesToHex(address), bytesToHex(publicKey), bytesToHex(privateKey)]
  }
  
  createAccount() {
    const { mnemonic, entropy } = this._generateMnemonic();  
    const [accountNumber, publicKey, privateKey] = this.retriveAccount(mnemonic)
    return [mnemonic, `0x${accountNumber}`, publicKey, privateKey]
  }

  retrieveAccountFromRecoveryPhrases(_mnemonic) {
    const entropy = mnemonicToEntropy(_mnemonic, wordlist);
    return this.retriveAccount(entropy)
  }

}
