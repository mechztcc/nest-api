import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from '../../entities/bank-account.entity';

@Injectable()
export class IndexService {
  constructor(
    @InjectRepository(BankAccount)
    private accountsRepository: Repository<BankAccount>,
  ) {}

  async execute(): Promise<BankAccount[]> {
    const accounts = await this.accountsRepository.find({
      select: {
        id: true,
        code: true,
        user: {
          name: true,
        },
      },
      relations: { user: true },
    });

    return accounts;
  }
}
