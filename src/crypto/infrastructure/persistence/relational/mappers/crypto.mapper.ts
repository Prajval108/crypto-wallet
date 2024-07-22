import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { Crypto } from '../../../../domain/crypto';
import { CryptoEntity } from '../entities/crypto.entity';

export class CryptoMapper {
  static toDomain(raw: CryptoEntity): Crypto {
    const domainEntity = new Crypto();
    domainEntity.id = raw.id;
    domainEntity.userId = raw.userId
    domainEntity.accountNumber = raw.accountNumber;
    domainEntity.publicKey = raw.publicKey;
    domainEntity.recoveryPhrase = raw.recoveryPhrase;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Crypto): CryptoEntity {
    const persistenceEntity = new CryptoEntity();
    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.accountNumber = domainEntity.accountNumber;
    persistenceEntity.userId = Number(domainEntity.userId);
    persistenceEntity.publicKey = domainEntity.publicKey;
    persistenceEntity.recoveryPhrase = domainEntity.recoveryPhrase;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;

    return persistenceEntity;
  }
}
