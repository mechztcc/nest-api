import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from '../../entities/bank-account.entity';

@Injectable()
export class BalanceUserService {
  constructor(
    @InjectRepository(BankAccount)
    private accountsRepository: Repository<BankAccount>,
  ) {}

  async execute(userId: number): Promise<any> {
    const account = await this.accountsRepository.findOne({
      transaction: true,
      where: { user: { id: userId } },
    });

    account;
    return { accountBalance: account.balance, updatedAt: account.updated_at };
  }
}
