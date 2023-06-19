import { Module } from '@nestjs/common';
import { CreateSessionService } from './services/create-session/create-session.service';
import { AuthController } from './controllers/auth/auth.controller';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccount } from '../account/entities/bank-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, BankAccount])],
  providers: [CreateSessionService],
  controllers: [AuthController],
})
export class AuthModule {}
