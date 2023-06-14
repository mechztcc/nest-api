import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CreateUserService } from './services/create-user/create-user.service';

@Module({
  controllers: [UsersController],
  providers: [CreateUserService],
})
export class UsersModule {}
