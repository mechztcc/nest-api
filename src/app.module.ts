import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './modules/account/account.module';
import { BankAccount } from './modules/account/entities/bank-account.entity';
import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import { PixModule } from './modules/pix/pix.module';
import { TransactionHistoryEntity } from './modules/pix/entities/transaction-history.entity';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AccountModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      entities: [User, BankAccount, TransactionHistoryEntity],
      synchronize: false,
    }),
    PixModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
