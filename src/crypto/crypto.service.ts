import { Injectable } from '@nestjs/common';

import { CryptoRepository } from './infrastructure/persistence/crypto.repository';
import { Crypto } from './domain/crypto';
import { NullableType } from '../utils/types/nullable.type';
import { WalletService } from './wallet.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class CryptoService {
  constructor(
    private readonly cryptoRepository: CryptoRepository,
    private walletService: WalletService,
    private mailService: MailService,
  ) {}

  findById(id: Crypto['id']): Promise<NullableType<Crypto>> {
    return this.cryptoRepository.findById(id);
  }

  findByUserId(id: Crypto['id']): Promise<NullableType<Crypto>> {
    return this.cryptoRepository.findById(id);
  }

  create(data: Omit<Crypto, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Crypto> {
    return this.cryptoRepository.create(data);
  }

  async createCryptoAccount(userId:number, firstName:string|null|undefined, email:string|null|undefined): Promise<any> {
    const [recoveryPhrase, accountNumber, publicKey, privateKey]= this.walletService.createAccount();
    await this.create({userId, accountNumber, publicKey, recoveryPhrase});
    return await this.mailService.cryptoAccountActivation({
      name: firstName,
      to: email,
      data: {
        accountNumber,
        publicKey,
        privateKey
      },
    });
  }

  retrieveCryptoAccount(_mnemonic): any {
    return this.walletService.retrieveAccountFromRecoveryPhrases(_mnemonic);
  }
}
