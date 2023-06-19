import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionHistoryEntity } from '../../entities/transaction-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from 'src/modules/account/entities/bank-account.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class HistoryUserService {
  constructor(
    @InjectRepository(TransactionHistoryEntity)
    private transactionRepository: Repository<TransactionHistoryEntity>,

    @InjectRepository(User) private usersRepository: Repository<User>,

    @InjectRepository(BankAccount)
    private accountRepository: Repository<BankAccount>,
  ) {}

  async execute(userId: number): Promise<any> {
    const userExists = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const account = await this.accountRepository.findOne({
      where: { user: { id: userExists.id } },
      relations: { user: { account: true } },
    });

    const history = await this.transactionRepository.find({
      where: [
        { shipperAccountCode: account.code },
        { receiverAccountCode: account.code },
      ],
    });

    return history;
  }
}
