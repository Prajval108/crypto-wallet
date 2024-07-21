import { Injectable } from '@nestjs/common';

import { CryptoRepository } from './infrastructure/persistence/crypto.repository';
import { Crypto } from './domain/crypto';
import { NullableType } from '../utils/types/nullable.type';
import { WalletService } from './wallet.service';

@Injectable()
export class CryptoService {
  constructor(
    private readonly cryptoRepository: CryptoRepository,
    private walletService: WalletService,
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

  createCryptoAccount(): any {
    return this.walletService.createAccount();
  }

  retrieveCryptoAccount(_mnemonic): any {
    return this.walletService.retrieveAccountFromRecoveryPhrases(_mnemonic);
  }
}
