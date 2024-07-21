import { Module } from '@nestjs/common';
import { CryptoRepository } from '../crypto.repository';
import { CryptoRelationalRepository } from './repositories/crypto.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoEntity } from './entities/crypto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoEntity])],
  providers: [
    {
      provide: CryptoRepository,
      useClass: CryptoRelationalRepository,
    },
  ],
  exports: [CryptoRepository],
})
export class RelationalSessionPersistenceModule {}
