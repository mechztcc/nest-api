import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { BankAccount } from '../../entities/bank-account.entity';

@Injectable()
export class CreateBankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private accountsRepository: Repository<BankAccount>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(id: number): Promise<BankAccount> {
    const userExists = await this.usersRepository.findOneBy({ id: id });
    if (!userExists) {
      throw new NotFoundException('User not found.');
    }

    const accountExists = await this.accountsRepository.findOneBy({
      user: { id: userExists.id },
    });

    if (accountExists) {
      throw new ConflictException('User already has an account.');
    }

    const account = this.accountsRepository.create({
      user: userExists,
      balance: 1000,
    });
    this.accountsRepository.save(account);
    return account;
  }
}
