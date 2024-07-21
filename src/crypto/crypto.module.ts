import { Module } from '@nestjs/common';
import { RelationalSessionPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { CryptoService } from './crypto.service';
import { WalletService } from './wallet.service';

const infrastructurePersistenceModule = RelationalSessionPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  providers: [CryptoService, WalletService],
  exports: [CryptoService, infrastructurePersistenceModule],
})
export class CryptoModule {}
