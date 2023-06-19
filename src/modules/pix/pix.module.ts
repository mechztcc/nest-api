import { Module } from '@nestjs/common';
import { MakeTransferService } from './services/make-transfer/make-transfer.service';
import { PixController } from './controllers/pix/pix.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { BankAccount } from '../account/entities/bank-account.entity';
import { AccountModule } from '../account/account.module';
import { TransactionHistoryEntity } from './entities/transaction-history.entity';
import { HistoryUserService } from './services/history-user/history-user.service';

@Module({
  imports: [
    UsersModule,
    AccountModule,
    TypeOrmModule.forFeature([User, BankAccount, TransactionHistoryEntity]),
  ],
  providers: [MakeTransferService, TransactionHistoryEntity, HistoryUserService],
  controllers: [PixController],
  exports: [TransactionHistoryEntity],
})
export class PixModule {}
