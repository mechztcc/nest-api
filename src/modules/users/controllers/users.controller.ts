import { Controller, Get, Inject } from '@nestjs/common';
import { CreateUserService } from '../services/create-user/create-user.service';

@Controller('users')
export class UsersController {
  constructor(private createUserService: CreateUserService) {}
  @Get()
  async findAll() {
    const users = await this.createUserService.execute();
    return users;
  }
}
