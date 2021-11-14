import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Address } from '../addresses/entities/address.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { PaginatorDto } from './dto/paginator.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create(createUserDto),
    );
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async getAddress(id: number): Promise<Address> {
    const user = await this.findOne(id);
    return user.address;
  }

  updateAddress(id: number, address: Address) {
    return this.usersRepository.update(id, { address: address });
  }

  async findAll(options: PaginatorDto): Promise<Pagination<Partial<User>>> {
    if (typeof options.fields === 'string') options.fields = [options.fields];
    return paginate<Partial<User>>(this.usersRepository.createQueryBuilder().select((options.fields || ['id', 'firstName', 'lastName', 'email']).map(s => "User." + s)), options);
  }
}
