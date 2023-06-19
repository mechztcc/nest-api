import { Module } from '@nestjs/common';
import { CreateSessionService } from './services/create-session/create-session.service';
import { AuthController } from './controllers/auth/auth.controller';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CreateSessionService],
  controllers: [AuthController],
})
export class AuthModule {}
