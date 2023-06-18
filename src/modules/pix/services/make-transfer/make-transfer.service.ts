import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from 'src/modules/account/entities/bank-account.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { MakeTransferDto } from '../../dto/make-transfer-dto/make-transfer-dto';
import { TransactionHistoryEntity } from '../../entities/transaction-history.entity';

@Injectable()
export class MakeTransferService {
  constructor(
    @InjectRepository(TransactionHistoryEntity)
    private transactionRepository: Repository<TransactionHistoryEntity>,

    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(BankAccount)
    private accountRepository: Repository<BankAccount>,
  ) {}

  async execute(data: MakeTransferDto) {
    const shipper = await this.accountRepository.findOne({
      where: { code: data.shipperCode },
      relations: ['user'],
    });

    const receiver = await this.accountRepository.findOne({
      where: { code: data.receiverCode },
      relations: ['user'],
    });

    if (!shipper || !receiver) {
      throw new NotFoundException('Account not found');
    }

    console.log(shipper, receiver);

    if (shipper.balance < data.value) {
      throw new ConflictException(
        'Account bank account does not have enough balance',
      );
    }

    shipper.balance = shipper.balance - data.value;

    const transaction = this.transactionRepository.create({
      shipperAccountCode: data.shipperCode,
      receiverAccountCode: data.receiverCode,
      value: data.value,
      status: 'done',
    });

    await this.transactionRepository.save(transaction);
    await this.accountRepository.save(shipper);
    await this.accountRepository.save(receiver);

    return transaction;
  }
}
