import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dto/create-user-dto/create-user-dto';
import { User } from '../../entities/user.entity';

import * as bcrypt from 'bcrypt';
import { BankAccount } from 'src/modules/account/entities/bank-account.entity';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(BankAccount)
    private accountRepository: Repository<BankAccount>,
  ) {}

  async execute({ document, name, password }: CreateUserDto): Promise<User> {
    const hashedPass = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      name,
      document,
      password: hashedPass,
    });
    await this.usersRepository.save(user);

    return user;
  }
}
