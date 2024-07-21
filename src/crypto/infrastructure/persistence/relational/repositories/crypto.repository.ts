import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CryptoEntity } from '../entities/crypto.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';

import { CryptoRepository } from '../../crypto.repository';
import { Crypto } from '../../../../domain/crypto';

import { CryptoMapper } from '../mappers/crypto.mapper';
import { User } from '../../../../../users/domain/user';

@Injectable()
export class CryptoRelationalRepository implements CryptoRepository {
  constructor(
    @InjectRepository(CryptoEntity)
    private readonly cryptoRepository: Repository<CryptoEntity>,
  ) {}

  async findById(id: Crypto['id']): Promise<NullableType<Crypto>> {
    const entity = await this.cryptoRepository.findOne({
      where: {
        id: Number(id),
      },
    });

    return entity ? CryptoMapper.toDomain(entity) : null;
  }

  async findByUserId(conditions: { userId: User['id'] }): Promise<NullableType<Crypto>> {
    const entity = await this.cryptoRepository.findOne({
      where: {
        id: Number(conditions.userId),
      },
    });
    return entity ? CryptoMapper.toDomain(entity) : null;
  }

  async create(data: Crypto): Promise<any> {
    const persistenceModel = CryptoMapper.toPersistence(data);
    return this.cryptoRepository.save(
      this.cryptoRepository.create(persistenceModel),
    );
  }

}
