import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccount } from '../../entities/bank-account.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindByUserService {
  constructor(
    @InjectRepository(BankAccount)
    private accountsRepository: Repository<BankAccount>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(userId: number): Promise<BankAccount> {
    const userExists = await this.usersRepository.findOneBy({ id: userId });
    if (!userExists) {
      throw new NotFoundException('User not found.');
    }

    const accountExists = await this.accountsRepository.findOneBy({
      user: { id: userExists.id },
    });

    if (!accountExists) {
      throw new NotFoundException('Account not found.');
    }
    return accountExists;
  }
}
