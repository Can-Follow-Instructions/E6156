import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Address } from '../../addresses/entities/address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => Address, (address) => address.users, { eager: true })
  address: Address;
}
