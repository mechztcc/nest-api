import { Module } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { AccountController } from './controllers/account/account.controller';
import { CreateBankAccountService } from './services/create-bank-account/create-bank-account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccount } from './entities/bank-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccount, User])],
  providers: [CreateBankAccountService],
  controllers: [AccountController],
})
export class AccountModule {}
