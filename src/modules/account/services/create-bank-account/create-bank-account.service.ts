import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from '../../entities/bank-account.entity';
import { User } from 'src/modules/users/entities/user.entity';

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

    const account = this.accountsRepository.create({ user: userExists });
    this.accountsRepository.save(account);
    return account;
  }
}
