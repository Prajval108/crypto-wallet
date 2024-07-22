import { Module } from '@nestjs/common';
import { RelationalSessionPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { CryptoService } from './crypto.service';
import { WalletService } from './wallet.service';
import { MailModule } from 'src/mail/mail.module';

const infrastructurePersistenceModule = RelationalSessionPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, MailModule],
  providers: [CryptoService, WalletService],
  exports: [CryptoService, infrastructurePersistenceModule],
})
export class CryptoModule {}
