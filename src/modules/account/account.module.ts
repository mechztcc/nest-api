import { Module } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [User],
})
export class AccountModule {}
