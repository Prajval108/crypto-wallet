import {
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'crypto',
})
export class CryptoEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  userId: number;

  @Column()
  accountNumber: string;

  @Column()
  publicKey: string;

  @Column()
  recoveryPhrase: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
