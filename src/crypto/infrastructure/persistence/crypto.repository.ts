import { User } from '../../../users/domain/user';
import { NullableType } from '../../../utils/types/nullable.type';
import { Crypto } from '../../domain/crypto';

export abstract class CryptoRepository {
  abstract findById(id: Crypto['id']): Promise<NullableType<Crypto>>;

  abstract findByUserId(conditions: { userId: User['id'] }):  Promise<NullableType<Crypto>>;

  abstract create(
    data: Omit<Crypto, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' >,
  ): Promise<Crypto>;

}
