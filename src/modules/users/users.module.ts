import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CreateUserService } from './services/create-user/create-user.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindAllUsersServiceService } from './services/find-all-users-service/find-all-users-service.service';
import { FindByIdServiceService } from './services/find-by-id-service/find-by-id-service.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [CreateUserService, User, FindAllUsersServiceService, FindByIdServiceService],
})
export class UsersModule {}
